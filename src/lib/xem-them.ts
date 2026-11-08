// Khối "Xem thêm" dạng thẻ có ảnh (ảnh + tên bài + link) ở cuối trang sản phẩm, danh mục và bài viết.
// - bangThe(): bảng tra đường dẫn → {tên, ảnh, loại} từ mọi trang đang bật.
// - theXemThem(): tạo danh sách thẻ từ các đường dẫn.
// - doiKhoiXemThem(): đổi dòng "**Xem thêm:** [A](/a) · [B](/b)" và mục "## Xem thêm" + danh sách link
//   trong thân bài markdown (đã render HTML) thành lưới thẻ. Chữ trên thẻ giữ nguyên chữ link người viết.
import { getActiveCategories, getActiveProducts, getActivePosts, postPath } from './content';
import { productImages, publicImageExists, webpSrcset, type ImageWithAlt } from './site';

export type LoaiThe = 'Danh mục' | 'Sản phẩm' | 'Bài viết' | 'Bảng giá';

export interface TheXemThem {
  href: string;
  tieuDe: string;
  loai: LoaiThe;
  anh?: ImageWithAlt;
}

const anhCo = (src?: string, alt?: string): ImageWithAlt | undefined =>
  publicImageExists(src) ? { src: src!, alt: alt ?? '' } : undefined;

// Trang viết tay (không nằm trong content collection).
const TRANG_RIENG: TheXemThem[] = [
  {
    href: '/bao-gia-dau-thuy-luc',
    tieuDe: 'Bảng giá dầu thủy lực',
    loai: 'Bảng giá',
    anh: { src: '/images/blog/kho-ht-vina-thanh-binh-1.webp', alt: 'Kho HT VINA với phuy và xô dầu các hãng' },
  },
];

let cache: Promise<Map<string, TheXemThem>> | undefined;

export function bangThe(): Promise<Map<string, TheXemThem>> {
  cache ??= (async () => {
    const [cats, products, posts] = await Promise.all([getActiveCategories(), getActiveProducts(), getActivePosts()]);
    const map = new Map<string, TheXemThem>();
    for (const c of cats) {
      map.set(`/${c.id}`, {
        href: `/${c.id}`,
        tieuDe: c.data.nav_label ?? c.data.title,
        loai: 'Danh mục',
        anh: anhCo(c.data.image, c.data.image_alt ?? c.data.nav_label ?? c.data.title),
      });
    }
    for (const p of products) {
      const href = `/${p.data.category}/${p.id}`;
      map.set(href, { href, tieuDe: p.data.title, loai: 'Sản phẩm', anh: productImages(p.data)[0] });
    }
    // Danh mục chưa có ảnh riêng: mượn ảnh sản phẩm đầu tiên có ảnh trong danh mục.
    for (const the of map.values()) {
      if (the.loai !== 'Danh mục' || the.anh) continue;
      const cat = the.href.slice(1);
      the.anh = products.filter((p) => p.data.category === cat).map((p) => map.get(`/${cat}/${p.id}`)?.anh).find(Boolean);
    }
    for (const b of posts) {
      const href = postPath(b);
      // Bài chưa có ảnh đại diện: dùng ảnh danh mục mà bài hỗ trợ.
      const anhDm = b.data.category ? map.get(`/${b.data.category}`)?.anh : undefined;
      map.set(href, {
        href,
        tieuDe: b.data.title,
        loai: 'Bài viết',
        anh: anhCo(b.data.image, b.data.image_alt ?? b.data.title) ?? anhDm,
      });
    }
    for (const t of TRANG_RIENG) map.set(t.href, { ...t, anh: t.anh && anhCo(t.anh.src, t.anh.alt) });
    return map;
  })();
  return cache;
}

const sach = (href: string) => href.split(/[?#]/)[0].replace(/\/+$/, '') || '/';

/** Thẻ cho các đường dẫn (bỏ trang tắt, trang hiện tại và đường dẫn trùng). tieuDe ghi đè tên mặc định. */
export async function theXemThem(
  muc: (string | { href: string; tieuDe?: string })[],
  boQua: string[] = [],
): Promise<TheXemThem[]> {
  const map = await bangThe();
  const daCo = new Set(boQua.map(sach));
  const kq: TheXemThem[] = [];
  for (const m of muc) {
    const { href, tieuDe } = typeof m === 'string' ? { href: m, tieuDe: undefined } : m;
    const key = sach(href);
    const the = map.get(key);
    if (!the || daCo.has(key)) continue;
    daCo.add(key);
    kq.push({ ...the, ...(tieuDe ? { tieuDe } : {}) });
  }
  return kq;
}

const esc = (t: string) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/** HTML của lưới thẻ. Dùng chung cho component XemThem.astro và phần đổi khối trong thân bài. */
export function htmlLuoiThe(cards: TheXemThem[], tieuDe = 'Xem thêm', id?: string): string {
  if (!cards.length) return '';
  const the = cards
    .map((c) => {
      const srcset = c.anh ? webpSrcset(c.anh.src) : undefined;
      const anh = c.anh
        ? `<img src="${esc(c.anh.src)}"${srcset ? ` srcset="${srcset}" sizes="(max-width: 640px) 112px, 320px"` : ''} alt="${esc(c.anh.alt)}" width="320" height="180" loading="lazy" decoding="async">`
        : `<span class="xt-khong-anh" aria-hidden="true">HT VINA</span>`;
      return `<li><a class="xt-the" href="${esc(c.href)}"><span class="xt-anh">${anh}</span><span class="xt-chu"><span class="xt-loai">${c.loai}</span><span class="xt-ten">${esc(c.tieuDe)}</span></span></a></li>`;
    })
    .join('');
  return `<nav class="xem-them" aria-label="${esc(tieuDe)}"><h2 class="xt-tieu-de"${id ? ` id="${id}"` : ''}>${esc(tieuDe)}</h2><ul class="xt-luoi">${the}</ul></nav>`;
}

const LINK = /<a\s[^>]*href="(\/[^"]*)"[^>]*>([\s\S]*?)<\/a>/g;
const boThe = (t: string) => t.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();

/** Đổi các khối "Xem thêm" chỉ gồm link trong HTML thân bài thành lưới thẻ có ảnh. */
export async function doiKhoiXemThem(html: string): Promise<string> {
  if (!/Xem thêm/.test(html)) return html;
  const map = await bangThe();
  const lay = (khoi: string) =>
    [...khoi.matchAll(LINK)].map(([, href, text]) => ({ href, tieuDe: boThe(text) })).filter((l) => map.has(sach(l.href)));

  // 1) <p><strong>Xem thêm:</strong> <a>…</a> · <a>…</a></p>
  html = html.replace(/<p>\s*<strong>\s*Xem thêm:?\s*<\/strong>:?([\s\S]*?)<\/p>/g, (goc, khoi: string) => {
    // Chỉ đổi khi đoạn chỉ có link và dấu phân cách, không có câu văn.
    const conLai = boThe(khoi.replace(LINK, '')).replace(/[·•,;|\s]/g, '');
    if (conLai) return goc;
    const links = lay(khoi);
    return links.length ? htmlLuoiTheDongBo(links, map) : goc;
  });

  // 2) <h2 id="…">Xem thêm</h2> <ul><li><a>…</a></li>…</ul>
  html = html.replace(/<h2([^>]*)>\s*Xem thêm\s*<\/h2>\s*<ul>([\s\S]*?)<\/ul>/g, (goc, attrs: string, khoi: string) => {
    const links = lay(khoi);
    if (!links.length) return goc;
    const id = attrs.match(/id="([^"]+)"/)?.[1];
    return htmlLuoiTheDongBo(links, map, id);
  });
  return html;
}

function htmlLuoiTheDongBo(links: { href: string; tieuDe: string }[], map: Map<string, TheXemThem>, id?: string) {
  const cards = links.map((l) => ({ ...map.get(sach(l.href))!, href: l.href, tieuDe: l.tieuDe || map.get(sach(l.href))!.tieuDe }));
  return htmlLuoiThe(cards, 'Xem thêm', id);
}
