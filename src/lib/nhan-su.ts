// Nhân sự hiển thị ở mục "Đội ngũ" trang Giới thiệu. Nguồn: du-lieu-noi-bo/nhân_sự.md (06/10/2026).
// Người kiểm duyệt kỹ thuật trang sản phẩm lấy từ đây (schema Person, dòng "Kiểm duyệt kỹ thuật").
import { ORG_ID, SITE_URL } from './site';

export interface NhanSu {
  id: string; // dùng làm anchor: /gioi-thieu#<id>
  name: string;
  role: string;
  /** Mô tả công việc, chuyên môn, hiển thị trên trang */
  desc: string;
  degree?: string;
  affiliation?: string;
  /** Năm bắt đầu làm chuyên môn, để tính số năm kinh nghiệm */
  since?: number;
  knowsAbout?: string[];
  /** Ảnh chân dung trong public/, ví dụ /images/nhan-su/tran-tuan-huynh.webp */
  photo?: string;
  /** Hồ sơ công khai bên ngoài (LinkedIn...) cho schema sameAs */
  sameAs?: string[];
  /** Đoạn giới thiệu dài, hiển thị ở hồ sơ người kiểm duyệt */
  bio?: string[];
}

export const NHAN_SU: NhanSu[] = [
  {
    id: 'tran-tuan-huynh',
    name: 'Trần Tuấn Huỳnh',
    role: 'Chuyên viên tư vấn chất lượng',
    degree: 'Kỹ sư',
    affiliation: 'Petrovietnam Engineering Company (PV Engineering)',
    since: 2011,
    photo: '/images/nhan-su/tran-tuan-huynh.webp',
    sameAs: ['https://vn.linkedin.com/in/thanhtuan1386'],
    desc: 'Phụ trách tư vấn chất lượng: kiểm duyệt thông số kỹ thuật trên website theo TDS của hãng, tư vấn chọn dầu theo yêu cầu thiết bị và đánh giá chất lượng dầu đang sử dụng.',
    bio: [
      'Kỹ sư Trần Tuấn Huỳnh làm chuyên môn trong ngành dầu khí từ năm 2011 và hiện công tác tại Petrovietnam Engineering Company (PV Engineering).',
      'Tại HT VINA, anh Huỳnh kiểm duyệt nội dung kỹ thuật trước khi đăng lên website: đối chiếu thông số với bảng TDS của hãng và tiêu chuẩn thử nghiệm ASTM, ISO, TCVN; rà soát khuyến cáo sử dụng, ngưỡng thay dầu và hướng dẫn kiểm tra dầu tại xưởng.',
    ],
    knowsAbout: ['Kỹ thuật dầu khí', 'Dầu nhớt công nghiệp', 'Dầu thủy lực', 'Kiểm tra chất lượng dầu bôi trơn'],
  },
  {
    id: 'vu-minh-toan',
    name: 'Vũ Minh Toàn',
    // TODO: bổ sung chức danh và công việc phụ trách.
    role: 'Nhân viên',
    degree: 'Cao đẳng Hóa chất',
    desc: 'Chuyên môn hóa chất.',
  },
  {
    id: 'nguyen-thi-hong',
    name: 'Nguyễn Thị Hồng',
    role: 'Quản lý bán hàng',
    desc: 'Phụ trách quản lý bán hàng, hóa đơn và các thủ tục liên quan.',
  },
  {
    id: 'pham-van-huu',
    name: 'Phạm Văn Hữu',
    role: 'Nhân viên kho vận',
    desc: 'Xuất hàng hóa tại kho và vận chuyển hàng hóa tới khách hàng.',
  },
];

/** Người kiểm duyệt mặc định cho trang sản phẩm khi file không ghi reviewed_by. */
export const DEFAULT_REVIEWER_ID = 'tran-tuan-huynh';

export const personUrl = (p: NhanSu) => `/gioi-thieu#${p.id}`;
export const personId = (p: NhanSu) => `${SITE_URL}/gioi-thieu#${p.id}`;
export const yearsOf = (p: NhanSu) => (p.since ? new Date().getFullYear() - p.since : undefined);

/** Tra theo id hoặc họ tên (giá trị trường reviewed_by). */
export function timNhanSu(key?: string): NhanSu | undefined {
  if (!key) return undefined;
  const k = key.trim().toLowerCase();
  return NHAN_SU.find((p) => p.id === k || p.name.toLowerCase() === k);
}

export function personSchema(p: NhanSu) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId(p),
    name: p.name,
    jobTitle: p.role,
    url: `${SITE_URL}${personUrl(p)}`,
    worksFor: { '@id': ORG_ID },
    ...(p.photo ? { image: `${SITE_URL}${p.photo}` } : {}),
    ...(p.affiliation ? { affiliation: { '@type': 'Organization', name: p.affiliation } } : {}),
    ...(p.degree
      ? { hasCredential: { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: p.degree } }
      : {}),
    ...(p.knowsAbout ? { knowsAbout: p.knowsAbout } : {}),
    ...(p.sameAs ? { sameAs: p.sameAs } : {}),
    description: p.bio ? p.bio.join(' ') : p.desc,
  };
}

/** Tham chiếu gọn tới Person trong schema trang khác. */
export const personRef = (p: NhanSu) => ({ '@type': 'Person', '@id': personId(p), name: p.name, jobTitle: p.role, url: `${SITE_URL}${personUrl(p)}` });
