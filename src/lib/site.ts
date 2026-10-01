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
export const BRANDS = ['Shell', 'Castrol', 'Mobil', 'TotalEnergies', 'ENEOS', 'EMI', 'VHP', 'XONE'];

// Domain chính thức. Staging vẫn dùng noindex (PUBLIC_INDEXABLE), nên canonical trỏ về domain thật cũng an toàn.
const FALLBACK_SITE = 'https://daucongnghiephp.com.vn';

/** Domain chính thức, không có dấu "/" ở cuối. */
export const SITE_URL = (import.meta.env.PUBLIC_SITE_URL || FALLBACK_SITE).replace(/\/+$/, '');

/**
 * Chỉ cho Google index khi build production có PUBLIC_INDEXABLE=true.
 * Mặc định (dev, staging, *.workers.dev) mọi trang đều có noindex.
 */
export const INDEXABLE = import.meta.env.PUBLIC_INDEXABLE === 'true';

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
