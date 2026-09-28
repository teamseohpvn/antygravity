// Thông tin doanh nghiệp và các hàm dùng chung cho SEO.
// Đổi domain chính thức bằng biến môi trường PUBLIC_SITE_URL khi build.

export const SITE_NAME = 'Dầu Công Nghiệp Pro';

export const BUSINESS = {
  name: SITE_NAME,
  phone: '0901511313',
  phoneDisplay: '0901 511 313',
  zaloUrl: 'https://zalo.me/0901511313',
  streetAddress: '108 Đường Thanh Bình',
  locality: 'P. Lê Thanh Nghị',
  region: 'TP Hải Phòng',
  postalCode: '180000',
  country: 'VN',
  logo: '/favicon.svg',
  image: '/images/dau-thuy-luc-may-ep-nhua-chinh-hang.jpg',
};

export const ADDRESS_TEXT = `${BUSINESS.streetAddress}, ${BUSINESS.locality}, ${BUSINESS.region}`;

const FALLBACK_SITE = 'https://antygravity.nhadat339shangdao.workers.dev';

/** Domain chính thức, không có dấu "/" ở cuối. */
export const SITE_URL = (import.meta.env.PUBLIC_SITE_URL || FALLBACK_SITE).replace(/\/+$/, '');

/**
 * Chỉ cho Google index khi build production có PUBLIC_INDEXABLE=true.
 * Mặc định (dev, staging, *.workers.dev) mọi trang đều có noindex.
 */
export const INDEXABLE = import.meta.env.PUBLIC_INDEXABLE === 'true';

/** Chuẩn hoá đường dẫn: bỏ "/" cuối (trừ trang chủ). */
export function normalizePath(pathname: string): string {
  const p = pathname.replace(/\/+$/, '');
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
    '@type': ['Organization', 'LocalBusiness'],
    '@id': ORG_ID,
    name: BUSINESS.name,
    url: SITE_URL + '/',
    logo: absUrl(BUSINESS.logo),
    image: absUrl(BUSINESS.image),
    telephone: BUSINESS.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.locality,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    areaServed: ['Hải Phòng', 'Quảng Ninh', 'Bắc Ninh', 'Hưng Yên', 'Hà Nội', 'Miền Bắc Việt Nam'],
    // TODO: thêm sameAs (Google Business Profile, Facebook, Zalo OA) khi có.
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
