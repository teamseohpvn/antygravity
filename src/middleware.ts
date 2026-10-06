// 1. Trang bảng giá: trả HTML tĩnh đã xuất bản trong KV (không đọc D1 mỗi lượt khách).
// 2. Bảo vệ trang quản trị giá /quan-tri* và /api/quan-tri/*.
// Chỉ chạy với route server; trang prerender không đi qua đây khi khách truy cập.
import { defineMiddleware } from 'astro:middleware';
import { COOKIE, readSession, sameOrigin } from './lib/admin-auth';
import { docTrang, ghiTrang, headersTrangTinh, laTrangGia } from './lib/trang-tinh';

const isAdminPath = (p: string) => p === '/quan-tri' || p.startsWith('/quan-tri/') || p.startsWith('/api/quan-tri/');
const PUBLIC_ADMIN = new Set(['/quan-tri/dang-nhap', '/api/quan-tri/dang-nhap']);

export const onRequest = defineMiddleware(async (ctx, next) => {
  const path = ctx.url.pathname.replace(/\.html$/, '').replace(/\/+$/, '') || '/';

  if (laTrangGia(path) && (ctx.request.method === 'GET' || ctx.request.method === 'HEAD')) {
    // Đang xuất bản (gọi từ API quản trị): render mới từ D1.
    if (ctx.locals.taoLaiTrangTinh) return next();
    try {
      const saved = await docTrang(path);
      if (saved) return new Response(ctx.request.method === 'HEAD' ? null : saved.html, { headers: headersTrangTinh(saved.meta) });
    } catch (e) {
      console.error('trang-tinh: không đọc được KV', e);
    }
    // Chưa có bản tĩnh (lần đầu, hoặc vừa deploy bản mới): render một lần từ D1 rồi lưu lại.
    const res = await next();
    if (res.status !== 200 || !(res.headers.get('content-type') ?? '').includes('text/html')) return res;
    const html = await res.text();
    try {
      const meta = await ghiTrang(path, html, 'tu-dong');
      return new Response(html, { headers: headersTrangTinh(meta) });
    } catch (e) {
      console.error('trang-tinh: không ghi được KV', e);
      return new Response(html, { status: 200, headers: res.headers });
    }
  }

  if (!isAdminPath(path)) return next();

  const harden = (res: Response) => {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    res.headers.set('Cache-Control', 'no-store');
    res.headers.set('Referrer-Policy', 'same-origin');
    return res;
  };

  // Mọi request ghi dữ liệu phải cùng Origin (chống CSRF), kể cả form đăng nhập.
  if (ctx.request.method !== 'GET' && ctx.request.method !== 'HEAD' && !sameOrigin(ctx.request)) {
    return harden(new Response('Forbidden', { status: 403 }));
  }

  if (PUBLIC_ADMIN.has(path)) return harden(await next());

  const session = await readSession(ctx.cookies.get(COOKIE)?.value);
  if (!session) {
    if (path.startsWith('/api/')) {
      return harden(new Response(JSON.stringify({ ok: false, error: 'Phiên đăng nhập đã hết, vui lòng đăng nhập lại.' }), {
        status: 401,
        headers: { 'content-type': 'application/json; charset=utf-8' },
      }));
    }
    return harden(new Response(null, { status: 303, headers: { Location: '/quan-tri/dang-nhap' } }));
  }
  ctx.locals.adminUser = session.user;
  return harden(await next());
});
