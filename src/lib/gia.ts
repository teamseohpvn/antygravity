// Đọc bảng giá từ Cloudflare D1 (binding DB, khai báo trong wrangler.jsonc).
// Chính sách giá: web chỉ hiện KHOẢNG giá, không bao giờ trả cột `gia` nguyên văn ra trang công khai.
import { env } from 'cloudflare:workers';
import { khoangGia } from './gia-tinh';
import { damBaoCsdl } from './khoi-tao';

export { khoangGia, fmtVnd, fmtNgay } from './gia-tinh';

export interface GiaRow {
  id: number;
  ma_hh: string | null;
  ten: string;
  hang: string;
  danh_muc: string;
  cap: string | null;
  nguon: 'nhap-khau' | 'trong-nuoc';
  quy_cach: string;
  dung_tich: number | null;
  don_vi_do: 'L' | 'kg';
  gia: number | null;
  trang: string | null;
  hien_thi: number;
  thu_tu: number;
  ghi_chu: string | null;
  cap_nhat_luc: string;
}

export interface CauHinh {
  he_so_tren: number;
  gom_vat: boolean;
  ngay_ra_soat: string; // YYYY-MM-DD
  nhan_dinh: string;
}

/** Một dòng trên bảng giá công khai: chỉ có khoảng giá, đã làm tròn. */
export interface DongGiaCongKhai {
  ten: string;
  hang: string;
  cap: string | null;
  nguon: 'nhap-khau' | 'trong-nuoc';
  quy_cach: string;
  trang: string | null;
  thap: number | null; // VNĐ / đơn vị đóng gói
  cao: number | null;
  thap_don_vi: number | null; // VNĐ / lít (hoặc kg)
  cao_don_vi: number | null;
  don_vi_do: 'L' | 'kg';
}

export const db = (): D1Database => {
  const d = (env as unknown as { DB?: D1Database }).DB;
  if (!d) throw new Error('Chưa có binding D1 "DB" (xem wrangler.jsonc).');
  return d;
};

const DEFAULTS: CauHinh = { he_so_tren: 1.15, gom_vat: false, ngay_ra_soat: '', nhan_dinh: '' };

export async function docCauHinh(d = db()): Promise<CauHinh> {
  const { results } = await d.prepare('SELECT khoa, gia_tri FROM cau_hinh').all<{ khoa: string; gia_tri: string }>();
  const m = Object.fromEntries(results.map((r) => [r.khoa, r.gia_tri]));
  const heSo = Number(m.he_so_tren);
  return {
    he_so_tren: Number.isFinite(heSo) && heSo >= 1 && heSo <= 2 ? heSo : DEFAULTS.he_so_tren,
    gom_vat: m.gom_vat === '1',
    ngay_ra_soat: m.ngay_ra_soat ?? '',
    nhan_dinh: m.nhan_dinh ?? '',
  };
}

/** Các dòng đang hiện của một danh mục, đã đổi sang khoảng giá. */
export async function bangGiaCongKhai(danhMuc: string): Promise<{ rows: DongGiaCongKhai[]; cauHinh: CauHinh; capNhat: string | null }> {
  const d = db();
  await damBaoCsdl(d);
  const [cauHinh, { results }] = await Promise.all([
    docCauHinh(d),
    d
      .prepare('SELECT * FROM gia_san_pham WHERE danh_muc = ?1 AND hien_thi = 1 ORDER BY thu_tu, cap, ten, dung_tich DESC')
      .bind(danhMuc)
      .all<GiaRow>(),
  ]);
  const rows = results.map((r) => ({
    ten: r.ten,
    hang: r.hang,
    cap: r.cap,
    nguon: r.nguon,
    quy_cach: r.quy_cach,
    trang: r.trang,
    don_vi_do: r.don_vi_do,
    ...khoangGia(r.gia, r.dung_tich, cauHinh.he_so_tren),
  }));
  const capNhat = results.reduce<string | null>((max, r) => (!max || r.cap_nhat_luc > max ? r.cap_nhat_luc : max), null);
  return { rows, cauHinh, capNhat };
}
