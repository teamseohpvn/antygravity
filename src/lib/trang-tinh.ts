// Trang bảng giá dạng "file HTML tĩnh" lưu trong Workers KV (binding TRANG_TINH).
//
// - Quản trị lưu giá → API render trang MỘT lần từ D1 → ghi HTML vào KV (xuatBan).
// - Khách truy cập → middleware trả nguyên HTML từ KV, không đọc D1 (docTrang).
// - HTML gắn mã build: deploy bản mới (đổi CSS/JS) thì bản HTML cũ tự bị bỏ và render lại,
//   tránh trang trỏ tới file /_astro/*.js đã bị xóa.
import { env } from 'cloudflare:workers';

declare const __BUILD_ID__: string;
export const BUILD_ID = typeof __BUILD_ID__ === 'undefined' ? 'dev' : __BUILD_ID__;

/** Các trang bảng giá được xuất bản tĩnh. Thêm trang mới: thêm đường dẫn vào đây. */
export const TRANG_GIA = ['/bao-gia-dau-thuy-luc'] as const;
export const laTrangGia = (path: string) => (TRANG_GIA as readonly string[]).includes(path);

export interface TrangMeta {
  build: string;
  luc: string; // ISO, thời điểm xuất bản
  nguoi: string;
}

const kv = (): KVNamespace | undefined => (env as unknown as { TRANG_TINH?: KVNamespace }).TRANG_TINH;
const key = (path: string) => `html:${path}`;

/** HTML đã xuất bản của trang, hoặc null nếu chưa có / khác bản build hiện tại. */
export async function docTrang(path: string): Promise<{ html: string; meta: TrangMeta } | null> {
  const store = kv();
  if (!store) return null;
  // cacheTtl: giữ bản sao tại máy chủ Cloudflare gần khách 60 giây, đọc gần như tức thì.
  const { value, metadata } = await store.getWithMetadata<TrangMeta>(key(path), { type: 'text', cacheTtl: 60 });
  if (!value || !metadata || metadata.build !== BUILD_ID) return null;
  return { html: value, meta: metadata };
}

export async function ghiTrang(path: string, html: string, nguoi: string): Promise<TrangMeta> {
  const store = kv();
  if (!store) throw new Error('Chưa có binding KV "TRANG_TINH" (xem wrangler.jsonc).');
  const meta: TrangMeta = { build: BUILD_ID, luc: new Date().toISOString(), nguoi };
  await store.put(key(path), html, { metadata: meta });
  return meta;
}

export async function thongTinXuatBan(): Promise<Array<{ path: string; meta: TrangMeta | null }>> {
  const store = kv();
  return Promise.all(
    TRANG_GIA.map(async (path) => {
      if (!store) return { path, meta: null };
      const { metadata } = await store.getWithMetadata<TrangMeta>(key(path));
      return { path, meta: metadata ?? null };
    }),
  );
}

/** Header khi trả trang tĩnh cho khách. */
export function headersTrangTinh(meta: TrangMeta): Headers {
  return new Headers({
    'content-type': 'text/html; charset=utf-8',
    // Trình duyệt giữ 60 giây; Cloudflare edge giữ bản sao KV 60 giây (cacheTtl).
    'cache-control': 'public, max-age=60',
    'last-modified': new Date(meta.luc).toUTCString(),
    'x-trang-tinh': meta.luc,
  });
}
