// Nhân sự hiển thị ở mục "Đội ngũ" trang Giới thiệu. Nguồn: du-lieu-noi-bo/nhân_sự.md (06/10/2026).
// Người kiểm duyệt kỹ thuật trang sản phẩm lấy từ đây (schema Person, dòng "Kiểm duyệt kỹ thuật").
import { ORG_ID, SITE_URL } from './site';

export interface NhanSu {
  id: string; // dùng làm anchor: /about#<id>
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
  /** Email công việc (hộp thư chung của vị trí) */
  email?: string;
  /** Hồ sơ công khai bên ngoài (LinkedIn...) cho schema sameAs */
  sameAs?: string[];
  /** Đoạn giới thiệu dài, hiển thị ở hồ sơ người kiểm duyệt */
  bio?: string[];
  /** Danh xưng học vị đặt trước tên, ví dụ "TS." */
  honorificPrefix?: string;
  /** Trang của nơi công tác chính (để schema affiliation có url) */
  affiliationUrl?: string;
  /** Cộng tác viên bên ngoài: nơi công tác chính là affiliation, HT VINA chỉ là đơn vị cộng tác (không ghi worksFor HT VINA). */
  external?: boolean;
  /** Quá trình đào tạo, theo hồ sơ công khai */
  alumniOf?: { degree: string; field: string; school: string; year: number }[];
  /** Công bố khoa học tiêu biểu, theo hồ sơ công khai */
  publications?: { title: string; venue: string; year: number }[];
  /** Các bước làm việc riêng hiển thị trên trang hồ sơ (mặc định: quy trình kiểm duyệt thông số) */
  method?: string[];
  /** Nguồn xác nhận thông tin hồ sơ (ghi chú nội bộ, không hiển thị) */
  verifiedFrom?: string;
}

export const NHAN_SU: NhanSu[] = [
  {
    id: 'tran-tuan-huynh',
    name: 'Trần Tuấn Huỳnh',
    role: 'Chuyên viên tư vấn chất lượng',
    degree: 'Kỹ sư',
    affiliation: 'Petrovietnam Engineering Company (PV Engineering)',
    since: 2009,
    email: 'tvcl@daucongnghiephp.com.vn',
    photo: '/images/nhan-su/tran-tuan-huynh.webp',
    sameAs: ['https://vn.linkedin.com/in/thanhtuan1386'],
    desc: 'Phụ trách tư vấn chất lượng: kiểm duyệt thông số kỹ thuật trên website theo TDS của hãng, tư vấn chọn dầu theo yêu cầu thiết bị và đánh giá chất lượng dầu đang sử dụng.',
    bio: [
      'Kỹ sư Trần Tuấn Huỳnh làm chuyên môn trong ngành dầu khí từ năm 2009 và hiện công tác tại Petrovietnam Engineering Company (PV Engineering).',
      'Tại HT VINA, anh Huỳnh kiểm duyệt nội dung kỹ thuật trước khi đăng lên website: đối chiếu thông số với bảng TDS của hãng và tiêu chuẩn thử nghiệm ASTM, ISO, TCVN; rà soát khuyến cáo sử dụng, ngưỡng thay dầu và hướng dẫn kiểm tra dầu tại xưởng.',
    ],
    knowsAbout: ['Kỹ thuật dầu khí', 'Dầu nhớt công nghiệp', 'Dầu thủy lực', 'Kiểm tra chất lượng dầu bôi trơn'],
  },
  {
    id: 'bui-huy-tien',
    name: 'Bùi Huy Tiến',
    honorificPrefix: 'TS.',
    role: 'Cố vấn kỹ thuật (cộng tác viên)',
    degree: 'Tiến sĩ Kỹ thuật Cơ khí',
    affiliation: 'Trường Đại học Giao thông vận tải, Bộ môn Cơ khí – Cơ điện tử, Khoa Cơ khí',
    affiliationUrl: 'https://www.utc.edu.vn/',
    external: true,
    sameAs: ['https://www.utc.edu.vn/doi-ngu-giang-vien/1695'],
    verifiedFrom: 'Trang giảng viên UTC https://www.utc.edu.vn/doi-ngu-giang-vien/1695 (truy cập 08/10/2026)',
    desc: 'Giảng viên Bộ môn Cơ khí – Cơ điện tử, Trường Đại học Giao thông vận tải. Cộng tác viên cố vấn kỹ thuật của HT VINA, biên soạn bài hướng dẫn kỹ thuật về máy ép nhựa và hệ thủy lực.',
    bio: [
      'TS. Bùi Huy Tiến là giảng viên Bộ môn Cơ khí – Cơ điện tử, Khoa Cơ khí, Trường Đại học Giao thông vận tải (Hà Nội). TS. Tiến tốt nghiệp kỹ sư Cơ khí tại Trường Đại học Bách khoa Hà Nội (2007), thạc sĩ Kỹ thuật Cơ khí/Cơ điện tử tại Trường Đại học Kỹ thuật Nam Đài Loan (2009) và tiến sĩ Kỹ thuật Cơ khí tại Trường Đại học Quốc lập Thành Công, Đài Loan (2014).',
      'Hướng nghiên cứu chính của TS. Tiến gồm máy ép phun nhựa, gia nhiệt cảm ứng, in 3D, UAV và UGV. TS. Tiến có nhiều bài báo quốc tế về hệ gia nhiệt cảm ứng cho xi lanh máy ép phun nhựa, và là đồng tác giả sách "Vật liệu chất dẻo và composite: công nghệ và cơ học" (NXB Xây dựng, 2020).',
      'Tại HT VINA, TS. Tiến là cộng tác viên cố vấn kỹ thuật, biên soạn các bài hướng dẫn trong mục Hỗ trợ kỹ thuật, tập trung vào máy ép nhựa, hệ thủy lực và vận hành thiết bị cơ khí. Thông tin học vị và nơi công tác ở trên được đối chiếu với hồ sơ giảng viên công khai trên website Trường Đại học Giao thông vận tải.',
    ],
    alumniOf: [
      { degree: 'Tiến sĩ', field: 'Kỹ thuật Cơ khí', school: 'Trường Đại học Quốc lập Thành Công (Đài Loan)', year: 2014 },
      { degree: 'Thạc sĩ', field: 'Kỹ thuật Cơ khí/Cơ điện tử', school: 'Trường Đại học Kỹ thuật Nam Đài Loan', year: 2009 },
      { degree: 'Kỹ sư', field: 'Cơ khí', school: 'Trường Đại học Bách khoa Hà Nội', year: 2007 },
    ],
    publications: [
      { title: 'Modeling a working coil coupled with magnetic flux concentrators for barrel induction heating in an injection molding machine', venue: 'International Journal of Heat and Mass Transfer, 86, 16–30', year: 2015 },
      { title: 'Development of barrel heating system in injection molding machine via induction heating', venue: 'Rapid Prototyping Journal, 21(3), 244–249', year: 2015 },
      { title: 'Design of an induction heating coil coupled with magnetic flux concentrators for barrel heating of an injection molding machine', venue: 'Proceedings of the IMechE, Part C: Journal of Mechanical Engineering Science, 229(3), 518–527', year: 2015 },
      { title: 'Vật liệu chất dẻo và composite: công nghệ và cơ học (sách, đồng tác giả với GS.TS Trần Ích Thịnh)', venue: 'NXB Xây dựng', year: 2020 },
    ],
    knowsAbout: ['Máy ép phun nhựa', 'Gia nhiệt cảm ứng', 'Hệ thủy lực máy ép', 'Cơ khí – cơ điện tử', 'In 3D', 'Vật liệu chất dẻo và composite'],
    method: [
      'Bài viết dựa trên nguyên lý kỹ thuật, tài liệu của nhà sản xuất thiết bị và bảng thông số (TDS) của hãng dầu.',
      'Số liệu và tiêu chuẩn thử nghiệm được dẫn nguồn (ASTM, ISO, TCVN) ngay trong bài.',
      'Bài viết ghi ngày cập nhật khi nội dung thay đổi thực chất.',
    ],
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

/** Người có đoạn giới thiệu (bio) có trang hồ sơ tác giả riêng /author/<id>; người khác dùng anchor ở trang Giới thiệu. */
export const hasProfile = (p: NhanSu) => Boolean(p.bio);
export const personUrl = (p: NhanSu) => (hasProfile(p) ? `/author/${p.id}` : `/about#${p.id}`);
export const personId = (p: NhanSu) => (hasProfile(p) ? `${SITE_URL}/author/${p.id}#person` : `${SITE_URL}/about#${p.id}`);
/** Dòng chứng chỉ ngắn cạnh tên tác giả, ví dụ "Kỹ sư, 17 năm kinh nghiệm" */
export const credentialLine = (p: NhanSu) =>
  [p.degree, p.since ? `${new Date().getFullYear() - p.since} năm kinh nghiệm` : undefined].filter(Boolean).join(', ');
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
    ...(p.honorificPrefix ? { honorificPrefix: p.honorificPrefix } : {}),
    // Cộng tác viên: nơi công tác chính là worksFor, HT VINA ghi ở affiliation. Nhân viên: worksFor HT VINA.
    ...(p.external && affiliationOrg(p)
      ? { worksFor: affiliationOrg(p), affiliation: { '@id': ORG_ID } }
      : { worksFor: { '@id': ORG_ID }, ...(affiliationOrg(p) ? { affiliation: affiliationOrg(p) } : {}) }),
    ...(p.photo ? { image: `${SITE_URL}${p.photo}` } : {}),
    ...(p.alumniOf ? { alumniOf: p.alumniOf.map((a) => ({ '@type': 'CollegeOrUniversity', name: a.school })) } : {}),
    ...(p.alumniOf
      ? { hasCredential: p.alumniOf.map((a) => ({ '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: `${a.degree} ${a.field} (${a.year})`, recognizedBy: { '@type': 'CollegeOrUniversity', name: a.school } })) }
      : p.degree
        ? { hasCredential: { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: p.degree } }
        : {}),
    ...(p.knowsAbout ? { knowsAbout: p.knowsAbout } : {}),
    hasOccupation: { '@type': 'Occupation', name: p.role, ...(p.knowsAbout ? { skills: p.knowsAbout.join(', ') } : {}) },
    ...(p.sameAs ? { sameAs: p.sameAs } : {}),
    ...(p.email ? { email: p.email } : {}),
    description: p.bio ? p.bio.join(' ') : p.desc,
  };
}

function affiliationOrg(p: NhanSu) {
  if (!p.affiliation) return undefined;
  return { '@type': p.external ? 'CollegeOrUniversity' : 'Organization', name: p.affiliation, ...(p.affiliationUrl ? { url: p.affiliationUrl } : {}) };
}

/** Tên kèm danh xưng, ví dụ "TS. Bùi Huy Tiến" */
export const displayName = (p: NhanSu) => (p.honorificPrefix ? `${p.honorificPrefix} ${p.name}` : p.name);

/** Nhãn cho link hồ sơ ngoài */
export const profileLabel = (u: string) =>
  u.includes('linkedin.com') ? 'LinkedIn' : u.includes('utc.edu.vn') ? 'Hồ sơ giảng viên, Trường ĐH Giao thông vận tải' : u.includes('orcid.org') ? 'ORCID' : new URL(u).hostname;

/** Tham chiếu gọn tới Person trong schema trang khác. */
export const personRef = (p: NhanSu) => ({ '@type': 'Person', '@id': personId(p), name: p.name, jobTitle: p.role, url: `${SITE_URL}${personUrl(p)}` });
