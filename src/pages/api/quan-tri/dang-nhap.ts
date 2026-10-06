import type { APIRoute } from 'astro';
import { COOKIE, adminConfigured, checkPassword, cookieOptions, createSession } from '../../../lib/admin-auth';

export const prerender = false;

const back = (msg: string) =>
  new Response(null, { status: 303, headers: { Location: `/quan-tri/dang-nhap?loi=${encodeURIComponent(msg)}` } });

// Đăng nhập: POST form { ten, mat_khau }. Đăng xuất: POST { dang_xuat: 1 }.
export const POST: APIRoute = async ({ request, cookies, url }) => {
  const form = await request.formData();

  if (form.get('dang_xuat')) {
    cookies.delete(COOKIE, { path: '/' });
    return new Response(null, { status: 303, headers: { Location: '/quan-tri/dang-nhap' } });
  }

  if (!adminConfigured()) return back('Trang quản trị chưa được cấu hình (thiếu ADMIN_PASSWORD hoặc ADMIN_SECRET).');

  const ten = String(form.get('ten') ?? '').trim().slice(0, 60);
  const matKhau = String(form.get('mat_khau') ?? '');
  if (!ten) return back('Vui lòng nhập tên người sửa giá.');

  if (!(await checkPassword(matKhau))) {
    // Làm chậm dò mật khẩu.
    await new Promise((r) => setTimeout(r, 1200));
    return back('Sai mật khẩu.');
  }

  cookies.set(COOKIE, await createSession(ten), cookieOptions(url.protocol === 'https:'));
  return new Response(null, { status: 303, headers: { Location: '/quan-tri' } });
};
