// Thông tin doanh nghiệp và các hàm dùng chung cho SEO.
// Đổi domain chính thức bằng biến môi trường PUBLIC_SITE_URL khi build.

declare const __PUBLIC_IMAGES__: string[];
const PUBLIC_IMAGES = new Set<string>(typeof __PUBLIC_IMAGES__ === 'undefined' ? [] : __PUBLIC_IMAGES__);
const existsSync = (publicPath: string) => PUBLIC_IMAGES.has(publicPath.replace(/^public/, ''));

export const SITE_NAME = 'Dầu Công Nghiệp HP';

// Pháp nhân đứng sau thương hiệu. Hiển thị ở footer, trang liên hệ và schema (legalName, taxID).
export const LEGAL_NAME = 'Công ty Cổ phần Thương mại Dịch vụ HT VINA';
export const LEGAL_SHORT = 'HT VINA';
export const TAX_ID = '0801139564';

export const BUSINESS = {
  name: SITE_NAME,
  phone: '0901511313',
  phoneDisplay: '0901 511 313',
  zaloUrl: 'https://zalo.me/0901511313',
  streetAddress: '108 Đường Thanh Bình',
  locality: 'P. Lê Thanh Nghị',
  region: 'TP Hải Phòng',
  // postalCode: bỏ mã 6 số cũ (180000). Tra mã 5 số mới trên VNPost rồi thêm lại.
  country: 'VN',
  logo: '/favicon.svg',
  image: '/images/hero-trang-chu.webp',
};

export const ADDRESS_TEXT = `${BUSINESS.streetAddress}, ${BUSINESS.locality}, ${BUSINESS.region}`;
// Kho nằm ở TP Hải Dương cũ (sáp nhập vào TP Hải Phòng từ 01/07/2025). Dùng ở lần nhắc địa bàn đầu tiên.
export const AREA_TEXT = 'TP Hải Phòng (Hải Dương cũ)';
export const ADDRESS_FULL = `${ADDRESS_TEXT} (TP Hải Dương cũ)`;
// KCN gần kho trước, xa kho sau.
export const KCN_NEAR = ['Đại An', 'Nam Sách', 'Phúc Điền', 'Tân Trường', 'Lai Vu'];
export const KCN_FAR = ['Tràng Duệ', 'Nomura', 'Đình Vũ', 'VSIP', 'Quế Võ', 'Phố Nối'];
/** Google Analytics 4 (du-lieu-noi-bo/script_anylytics_google.md). Đổi bằng biến PUBLIC_GA4_ID khi build. */
export const GA4_ID: string = import.meta.env.PUBLIC_GA4_ID || 'G-DSZVP9WS37';
/** Khóa localStorage lưu lựa chọn cookie: "granted" | "denied". Đổi tên khóa nếu muốn hỏi lại mọi người. */
export const CONSENT_KEY = 'hp-cookie-consent-v1';
/** Các trang chính sách, hiện ở chân trang. */
export const POLICY_LINKS = [
  { href: '/chinh-sach-giao-hang', label: 'Chính sách giao hàng' },
  { href: '/chinh-sach-thanh-toan', label: 'Chính sách thanh toán' },
  { href: '/chinh-sach-bao-mat', label: 'Chính sách bảo mật', rel: 'privacy-policy' },
  { href: '/dieu-khoan-su-dung', label: 'Điều khoản sử dụng', rel: 'terms-of-service' },
  { href: '/tuy-chon-cookie', label: 'Tùy chọn cookie' },
];
export const BRANDS = ['Shell', 'Castrol', 'Mobil', 'TotalEnergies', 'ENEOS', 'EMI', 'VHP', 'XONE'];

// Domain chính thức. Bản preview *.workers.dev cũng có canonical trỏ về domain thật, nên Google chỉ index domain chính.
const FALLBACK_SITE = 'https://daucongnghiephp.com.vn';

/** Domain chính thức, không có dấu "/" ở cuối. */
export const SITE_URL = (import.meta.env.PUBLIC_SITE_URL || FALLBACK_SITE).replace(/\/+$/, '');

/**
 * Công bố cho Google index từ 06/10/2026: mặc định mọi trang "index, follow".
 * Muốn chặn lại (bảo trì, staging riêng) thì build với PUBLIC_INDEXABLE=false.
 */
export const INDEXABLE = import.meta.env.PUBLIC_INDEXABLE !== 'false';

/**
 * Chuẩn hoá đường dẫn: bỏ đuôi ".html", "/index" và "/" cuối (trừ trang chủ).
 * Cần thiết vì build.format 'file' khiến Astro.url.pathname có dạng "/dau-thuy-luc.html".
 */
export function normalizePath(pathname: string): string {
  const p = pathname.replace(/\.html$/, '').replace(/\/index$/, '').replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

/** URL tuyệt đối trên domain chính thức. */
export function absUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return SITE_URL + normalizePath(pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`);
}

export interface Crumb {
  name: string;
  href: string;
}

export function breadcrumbSchema(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absUrl(item.href),
    })),
  };
}

export const ORG_ID = `${SITE_URL}/#organization`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['WholesaleStore', 'Organization'],
    '@id': ORG_ID,
    name: BUSINESS.name,
    alternateName: LEGAL_SHORT,
    legalName: LEGAL_NAME,
    taxID: TAX_ID,
    url: SITE_URL + '/',
    logo: absUrl(BUSINESS.logo),
    image: absUrl(BUSINESS.image),
    telephone: '+84' + BUSINESS.phone.replace(/^0/, ''),
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.locality,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    areaServed: ['Hải Phòng', 'Bắc Ninh', 'Hưng Yên', 'Quảng Ninh', 'Hà Nội'].map((name) => ({ '@type': 'AdministrativeArea', name })),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: '+84' + BUSINESS.phone.replace(/^0/, ''),
      areaServed: 'VN',
      availableLanguage: 'vi',
      url: absUrl('/lien-he'),
    },
    knowsAbout: ['Dầu thủy lực', 'Dầu bánh răng', 'Mỡ bôi trơn công nghiệp', 'Dầu máy nén khí', 'Dầu truyền nhiệt'],
    // TODO: thêm geo (tọa độ ghim Google Maps), openingHoursSpecification (giờ làm việc thật),
    // sameAs (Google Business Profile, Facebook, Zalo OA) khi có. Không điền giá trị đoán.
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL + '/',
    inLanguage: 'vi-VN',
    publisher: { '@id': ORG_ID },
  };
}

/**
 * Ảnh trong public/ có tồn tại không (chạy lúc build). Dùng để bỏ qua ảnh danh mục chưa tạo
 * thay vì hiện ảnh vỡ.
 */
export function publicImageExists(src?: string): src is string {
  if (!src || /^https?:\/\//.test(src)) return Boolean(src);
  return existsSync(`public${src}`);
}

/** srcset 600w/1200w cho ảnh .webp do scripts/optimize-images.mjs tạo ra. */
export function webpSrcset(src: string): string | undefined {
  const small = src.replace(/\.webp$/, '-600.webp');
  if (small === src || !existsSync(`public${small}`)) return undefined;
  return `${small} 600w, ${src} 1200w`;
}

export interface ImageWithAlt {
  src: string;
  alt: string;
}

/**
 * Danh sách ảnh sản phẩm dạng {src, alt}, ảnh chính đứng đầu.
 * Hỗ trợ cả dạng cũ (image: "...", images: ["..."]); ảnh thiếu alt thì dùng tên sản phẩm.
 * Ảnh chưa upload bị bỏ qua; nếu chưa có ảnh nào thì dùng tạm ảnh danh mục.
 */
export function productImages(d: {
  title: string;
  category?: string;
  categoryName?: string;
  image?: string;
  images?: (string | ImageWithAlt)[];
}): ImageWithAlt[] {
  const list = d.images?.length ? d.images : d.image ? [d.image] : [];
  const found = list
    .map((img) => (typeof img === 'string' ? { src: img, alt: d.title } : img))
    .filter((img) => publicImageExists(img.src));
  if (found.length || !d.category) return found;
  const fallback = `/images/danh-muc/${d.category}.webp`;
  return publicImageExists(fallback) ? [{ src: fallback, alt: d.categoryName ?? d.title }] : [];
}

/** Tên quy cách để hiển thị, chấp nhận cả dạng chuỗi và dạng {name, weight, sku}. */
export function packagingLabel(p: string | { name: string; weight?: string }): string {
  return typeof p === 'string' ? p : p.weight ? `${p.name} (${p.weight})` : p.name;
}
