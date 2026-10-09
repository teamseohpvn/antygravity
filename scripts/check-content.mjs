// Kiểm tra nhanh nội dung trước khi build/merge:
// - seo_title <= 65 ký tự, description <= 160 ký tự
// - không có công thức LaTeX ($...$) vì markdown của site không render
// - link nội bộ trong markdown trỏ tới danh mục / sản phẩm / trang có thật
// - trường active: bài nào thiếu, link nào trỏ tới bài đang tắt (khi build link đó tự bỏ, chỉ còn chữ)
// - tên file (slug) đúng chuẩn, mã bài viết (ma) không trùng
// - ảnh khai báo trong frontmatter có file trong public/ và có alt
// Chạy: npm run check:content
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { contentPages } from '../src/lib/active-pages.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const DIRS = { danhmuc: 'src/content/danhmuc', sanpham: 'src/content/sanpham', blog: 'src/content/blog' };
const STATIC_ROUTES = ['/', '/bao-gia', '/bao-gia-thanh-cong', '/contact', '/about', '/privacy-policy', '/terms-of-service', '/ho-tro-ky-thuat', '/bang-gia-dau-thuy-luc', '/khuyen-mai-dau-thuy-luc-aw-68', '/chinh-sach-giao-hang', '/chinh-sach-thanh-toan'];

const read = (dir) =>
  existsSync(join(ROOT, dir))
    ? readdirSync(join(ROOT, dir)).filter((f) => f.endsWith('.md')).map((f) => ({ file: join(dir, f), id: f.replace(/\.md$/, ''), text: readFileSync(join(ROOT, dir, f), 'utf8') }))
    : [];

const field = (text, key) => text.match(new RegExp(`^${key}:\\s*"(.*)"\\s*$`, 'm'))?.[1];
const entries = Object.fromEntries(Object.entries(DIRS).map(([k, d]) => [k, read(d)]));

const pages = contentPages();
const routes = new Set(STATIC_ROUTES);
const hiddenRoutes = new Set();
for (const p of pages) (p.active ? routes : hiddenRoutes).add(p.path);

const problems = [];
const hiddenLinks = [];
const noActive = pages.filter((p) => !p.hasActive).map((p) => p.file);
for (const e of Object.values(entries).flat()) {
  const seo = field(e.text, 'seo_title');
  const desc = field(e.text, 'description');
  if (seo && [...seo].length > 65) problems.push(`${e.file}: seo_title dài ${[...seo].length} ký tự (tối đa 65)`);
  if (desc && [...desc].length > 160) problems.push(`${e.file}: description dài ${[...desc].length} ký tự (tối đa 160)`);
  const body = e.text.split(/^---\s*$/m).slice(2).join('---');
  if (/\$[^$\s][^$]{0,40}\$/.test(body)) problems.push(`${e.file}: có công thức LaTeX ($...$) không render được`);
  for (const [, href] of body.matchAll(/\]\((\/[^)#?\s]*)[^)]*\)/g)) {
    const path = href.replace(/\/+$/, '') || '/';
    if (hiddenRoutes.has(path)) hiddenLinks.push(`${e.file}: ${href}`);
    else if (!routes.has(path)) problems.push(`${e.file}: link nội bộ hỏng ${href}`);
  }
}

// Slug, mã bài viết, ảnh.
const codes = new Map();
const missingImages = [];
for (const e of Object.values(entries).flat()) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.id)) problems.push(`${e.file}: tên file phải là chữ thường không dấu, nối bằng "-"`);
  const fm = e.text.split(/^---\s*$/m)[1] ?? '';
  const ma = field(fm, 'ma');
  if (ma) {
    if (codes.has(ma)) problems.push(`${e.file}: mã bài viết ${ma} trùng với ${codes.get(ma)}`);
    codes.set(ma, e.file);
  }
  const imgs = [
    ...[...fm.matchAll(/^image:\s*"([^"]+)"/gm)].map((m) => m[1]),
    ...[...fm.matchAll(/src:\s*"([^"]+)"/g)].map((m) => m[1]),
    ...[...fm.matchAll(/^\s*-\s*"(\/images\/[^"]+)"/gm)].map((m) => m[1]),
  ];
  for (const src of imgs) {
    if (src.startsWith('/') && !existsSync(join(ROOT, 'public', src))) missingImages.push(`${e.file}: public${src}`);
    if (/[A-Z\s_]|[^\x00-\x7F]/.test(src)) problems.push(`${e.file}: tên ảnh ${src} phải chữ thường, không dấu, nối bằng "-"`);
  }
  for (const m of fm.matchAll(/\{\s*src:\s*"[^"]+"\s*\}/g)) problems.push(`${e.file}: ảnh thiếu alt ${m[0]}`);
}
const missingCode = Object.values(entries).flat().filter((e) => !field(e.text.split(/^---\s*$/m)[1] ?? '', 'ma')).length;
if (missingImages.length) console.log(`Lưu ý: ${missingImages.length} ảnh chưa có file (trang sẽ ẩn ảnh):\n  ${missingImages.join('\n  ')}`);
const shown = pages.filter((p) => p.active).length;
console.log(`Bật/tắt: ${shown} bài đang bật, ${pages.length - shown} bài đang tắt (active: false hoặc danh mục đang tắt).`);
if (noActive.length) console.log(`Lưu ý: ${noActive.length} file thiếu trường active (đang bị ẩn):\n  ${noActive.join('\n  ')}`);
if (hiddenLinks.length) console.log(`Lưu ý: ${hiddenLinks.length} link trỏ tới bài đang tắt, khi build sẽ tự bỏ link (giữ chữ).`);
if (missingCode) console.log(`Lưu ý: ${missingCode} file chưa có mã bài viết (ma).`);

const todos = Object.values(entries).flat().filter((e) => /TODO/.test(e.text)).map((e) => e.file);
if (todos.length) console.log(`Lưu ý: còn TODO cần xác minh trong ${todos.length} file:\n  ${todos.join('\n  ')}`);

if (problems.length) {
  console.error(`\n${problems.length} lỗi nội dung:\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`\nNội dung OK (${Object.values(entries).flat().length} file).`);
