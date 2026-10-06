// Đăng nhập trang quản trị giá (/quan-tri).
// Secret đặt bằng `npx wrangler secret put`: ADMIN_PASSWORD (mật khẩu), ADMIN_SECRET (chuỗi ngẫu nhiên ký cookie).
// Nên bật thêm Cloudflare Access cho /quan-tri* (xem docs/BANG-GIA.md) để có lớp bảo vệ thứ hai.
import { env } from 'cloudflare:workers';

export const COOKIE = 'qt_phien';
const MAX_AGE = 12 * 60 * 60; // 12 giờ

type AdminEnv = { ADMIN_PASSWORD?: string; ADMIN_SECRET?: string };
const cfg = () => env as unknown as AdminEnv;

export const adminConfigured = () => Boolean(cfg().ADMIN_PASSWORD && cfg().ADMIN_SECRET && cfg().ADMIN_SECRET!.length >= 32);

const enc = new TextEncoder();
const b64url = (buf: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function hmac(data: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', enc.encode(cfg().ADMIN_SECRET!), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64url(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}

/** So sánh không lộ thời gian (tránh dò mật khẩu theo độ trễ). */
async function safeEqual(a: string, b: string): Promise<boolean> {
  const [ha, hb] = await Promise.all([hmac('pw:' + a), hmac('pw:' + b)]);
  let diff = ha.length ^ hb.length;
  for (let i = 0; i < Math.min(ha.length, hb.length); i++) diff |= ha.charCodeAt(i) ^ hb.charCodeAt(i);
  return diff === 0;
}

export async function checkPassword(pw: string): Promise<boolean> {
  if (!adminConfigured()) return false;
  return safeEqual(pw, cfg().ADMIN_PASSWORD!);
}

/** Cookie phiên: base64url(JSON{u, exp}).chữ_ký */
export async function createSession(user: string): Promise<string> {
  const payload = b64url(enc.encode(JSON.stringify({ u: user.slice(0, 60), exp: Math.floor(Date.now() / 1000) + MAX_AGE })));
  return `${payload}.${await hmac(payload)}`;
}

export async function readSession(token: string | undefined): Promise<{ user: string } | null> {
  if (!token || !adminConfigured()) return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig || (await hmac(payload)) !== sig) return null;
  try {
    const json = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(payload.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0))));
    if (typeof json.exp !== 'number' || json.exp < Date.now() / 1000) return null;
    return { user: String(json.u || 'admin') };
  } catch {
    return null;
  }
}

export const cookieOptions = (secure: boolean) => ({
  httpOnly: true,
  secure,
  sameSite: 'strict' as const,
  path: '/',
  maxAge: MAX_AGE,
});

/** Chống CSRF: request ghi dữ liệu phải đến từ chính site (cùng Origin). */
export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  return origin === new URL(request.url).origin;
}
