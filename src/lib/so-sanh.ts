// Bảng so sánh cùng loại trên trang sản phẩm: đặt sản phẩm cạnh 2–4 mã cùng công dụng đang bán trên web.
// Chỉ so trong cùng nhóm công dụng (dầu thủy lực với dầu thủy lực, mỡ với mỡ…), không so khác loại.
// Số liệu lấy từ `specs` của từng trang (theo TDS hãng); thiếu thì để "–", không tự điền.
import type { CollectionEntry } from 'astro:content';

type SanPham = CollectionEntry<'sanpham'>;
type Data = SanPham['data'];

interface Cot {
  ten: string;
  lay: (d: Data) => string | undefined;
}

interface Nhom {
  /** Tên nhóm dùng trong tiêu đề: "So sánh X với các <ten> khác" */
  ten: string;
  cot: Cot[];
}

/** Lấy giá trị chỉ tiêu đầu tiên có tên khớp mẫu; giữ phần chú thích bản (Spinax AW Super 68, NLGI 3, No2…). */
function spec(mau: RegExp) {
  return (d: Data) => {
    const s = d.specs?.find((x) => mau.test(x.name));
    if (!s) return undefined;
    const ban = s.name.match(/\(((?:Spinax|NLGI|No\d)[^)]*)\)/)?.[1];
    // Dòng nhiều cấp nhớt ("46: 46,5 · 68: 68,2 mm²/s"): dầu thủy lực chỉ lấy phần đúng cấp VG của trang.
    if (d.vg && s.value.includes('·')) {
      const phan = s.value.split('·').map((p) => p.trim());
      const dung = phan.find((p) => p.startsWith(`${d.vg}:`));
      if (dung) {
        const donVi = phan.at(-1)!.match(/\d\s*([^\d:·]+)$/)?.[1]?.trim() ?? '';
        const v = dung.replace(`${d.vg}:`, '').trim();
        return /[a-z°%]/i.test(v) || !donVi ? v : `${v} ${donVi}`;
      }
    }
    return ban ? `${ban}: ${s.value}` : s.value;
  };
}

const NHOM: Record<string, Nhom> = {
  'thuy-luc': {
    ten: 'dầu thủy lực 68',
    cot: [
      { ten: 'Tiêu chuẩn', lay: (d) => d.standards?.filter((s) => /11158|51524|HM|HLP/.test(s)).slice(0, 2).join(', ') || undefined },
      { ten: 'Độ nhớt ở 40 °C', lay: spec(/^Độ nhớt (động học )?ở 40/) },
      { ten: 'Chỉ số độ nhớt', lay: spec(/^Chỉ số độ nhớt/) },
      { ten: 'Điểm chớp cháy', lay: spec(/^Điểm chớp cháy/) },
      { ten: 'Điểm đông đặc', lay: spec(/^Điểm (đông đặc|rót chảy)/) },
    ],
  },
  diesel: {
    ten: 'dầu động cơ diesel',
    cot: [
      { ten: 'Cấp SAE', lay: (d) => d.sae },
      { ten: 'Cấp API', lay: (d) => d.api },
      { ten: 'Trị số kiềm (TBN)', lay: spec(/TBN/) },
      { ten: 'Chỉ số độ nhớt', lay: spec(/^Chỉ số độ nhớt/) },
      { ten: 'Tro sunphat', lay: spec(/[Tt]ro (sunphat|sulfat)/) },
    ],
  },
  'dau-cau': {
    ten: 'dầu cầu, dầu bánh răng',
    cot: [
      { ten: 'Cấp SAE', lay: (d) => d.sae },
      { ten: 'Cấp API', lay: (d) => d.api },
      { ten: 'Độ nhớt ở 100 °C', lay: spec(/^Độ nhớt (động học )?ở 100/) },
      { ten: 'Chỉ số độ nhớt', lay: spec(/^Chỉ số độ nhớt/) },
      { ten: 'Điểm chớp cháy', lay: spec(/^Điểm chớp cháy/) },
    ],
  },
  mo: {
    ten: 'mỡ bôi trơn',
    cot: [
      { ten: 'Cấp NLGI', lay: (d) => d.nlgi },
      { ten: 'Chất làm đặc', lay: spec(/^(Chất làm đặc|Loại xà phòng)/) },
      { ten: 'Nhiệt độ nhỏ giọt', lay: spec(/^(Nhiệt độ|Điểm) nhỏ giọt/) },
      { ten: 'Nhiệt độ làm việc', lay: spec(/^Nhiệt độ làm việc/) },
      { ten: 'Tải 4 bi', lay: spec(/4 bi/) },
    ],
  },
  'may-nen': {
    ten: 'dầu máy nén khí',
    cot: [
      { ten: 'Độ nhớt ở 40 °C', lay: spec(/^Độ nhớt (động học )?ở 40/) },
      { ten: 'Chỉ số độ nhớt', lay: spec(/^Chỉ số độ nhớt/) },
      { ten: 'Điểm chớp cháy', lay: spec(/^Điểm chớp cháy/) },
      { ten: 'Trị số axit', lay: spec(/^Trị số axit/) },
      { ten: 'Dầu gốc', lay: (d) => d.base_oil },
    ],
  },
};

/** Danh mục → nhóm công dụng. Mỡ chịu nhiệt so cùng mỡ bôi trơn (cùng là mỡ). */
const NHOM_THEO_DANH_MUC: Record<string, string> = {
  'dau-thuy-luc': 'thuy-luc',
  'dau-dong-co-diesel': 'diesel',
  'dau-cau-hop-so': 'dau-cau',
  'mo-boi-tron-cong-nghiep': 'mo',
  'mo-chiu-nhiet': 'mo',
  'dau-may-nen-khi': 'may-nen',
};

const nhomCua = (d: Data) => d.nhom_so_sanh ?? NHOM_THEO_DANH_MUC[d.category];

const capChung = (a?: string, b?: string) => {
  if (!a || !b) return false;
  const tach = (s: string) => s.split(/[\/,·]/).map((x) => x.trim()).filter(Boolean);
  const B = tach(b);
  return tach(a).some((x) => B.includes(x));
};

/** Điểm gần nhau: cùng cấp nhớt / API / NLGI, có TDS. */
function diemGan(a: Data, b: Data) {
  let diem = 0;
  if (a.vg && a.vg === b.vg) diem += 3;
  if (capChung(a.sae, b.sae)) diem += 3;
  if (a.api && b.api && a.api.split('/')[0] === b.api.split('/')[0]) diem += 3;
  if (capChung(a.nlgi, b.nlgi)) diem += 2;
  if (b.specs?.length) diem += 2;
  return diem;
}

/** Thứ tự phụ cố định theo cặp trang, để các trang cùng nhóm không lặp lại đúng một bộ 4 mã. */
const bam = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

export interface DongSoSanh {
  ten: string;
  href: string;
  laTrangNay: boolean;
  giaTri: (string | undefined)[];
  chonKhi?: string;
}

export interface BangSoSanh {
  tenNhom: string;
  cot: string[];
  dong: DongSoSanh[];
}

/** Tối đa 4 mã khác (bảng 5 dòng); nhóm chỉ có dưới 3 sản phẩm thì không có bảng. */
export function bangSoSanh(sp: SanPham, tatCa: SanPham[]): BangSoSanh | undefined {
  const khoa = nhomCua(sp.data);
  const nhom = khoa ? NHOM[khoa] : undefined;
  if (!nhom) return;
  const cungNhom = tatCa.filter((p) => p.id !== sp.id && nhomCua(p.data) === khoa);
  const chon = sp.data.so_sanh?.length
    ? sp.data.so_sanh.map((id) => cungNhom.find((p) => p.id === id)).filter((p): p is SanPham => !!p)
    : cungNhom
        .map((p) => ({ p, diem: diemGan(sp.data, p.data), phu: bam(sp.id + p.id) }))
        .sort((x, y) => y.diem - x.diem || x.phu - y.phu)
        .slice(0, 4)
        .map((x) => x.p);
  if (chon.length < 2) return;
  const dong = [sp, ...chon].map((p) => ({
    ten: p.data.title,
    href: `/${p.data.category}/${p.id}`,
    laTrangNay: p.id === sp.id,
    giaTri: nhom.cot.map((c) => c.lay(p.data)),
    chonKhi: p.data.so_sanh_chon_khi,
  }));
  return { tenNhom: nhom.ten, cot: nhom.cot.map((c) => c.ten), dong };
}
