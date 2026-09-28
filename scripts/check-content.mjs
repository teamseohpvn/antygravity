// Kiểm tra nhanh nội dung trước khi build/merge:
// - seo_title <= 65 ký tự, description <= 160 ký tự
// - không có công thức LaTeX ($...$) vì markdown của site không render
// - link nội bộ trong markdown trỏ tới danh mục / sản phẩm / trang có thật
// Chạy: npm run check:content
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const DIRS = { danhmuc: 'src/content/danhmuc', sanpham: 'src/content/sanpham', blog: 'src/content/blog' };
const STATIC_ROUTES = ['/', '/bao-gia', '/bao-gia/da-gui', '/lien-he', '/ho-tro-ky-thuat'];

const read = (dir) =>
  existsSync(join(ROOT, dir))
    ? readdirSync(join(ROOT, dir)).filter((f) => f.endsWith('.md')).map((f) => ({ file: join(dir, f), id: f.replace(/\.md$/, ''), text: readFileSync(join(ROOT, dir, f), 'utf8') }))
    : [];

const field = (text, key) => text.match(new RegExp(`^${key}:\\s*"(.*)"\\s*$`, 'm'))?.[1];
const entries = Object.fromEntries(Object.entries(DIRS).map(([k, d]) => [k, read(d)]));

const routes = new Set(STATIC_ROUTES);
entries.danhmuc.forEach((e) => routes.add(`/${e.id}`));
entries.sanpham.forEach((e) => routes.add(`/${field(e.text, 'category')}/${e.id}`));
entries.blog.forEach((e) => routes.add(`/ho-tro-ky-thuat/${e.id}`));

const problems = [];
for (const e of Object.values(entries).flat()) {
  const seo = field(e.text, 'seo_title');
  const desc = field(e.text, 'description');
  if (seo && [...seo].length > 65) problems.push(`${e.file}: seo_title dài ${[...seo].length} ký tự (tối đa 65)`);
  if (desc && [...desc].length > 160) problems.push(`${e.file}: description dài ${[...desc].length} ký tự (tối đa 160)`);
  const body = e.text.split(/^---\s*$/m).slice(2).join('---');
  if (/\$[^$\s][^$]{0,40}\$/.test(body)) problems.push(`${e.file}: có công thức LaTeX ($...$) không render được`);
  for (const [, href] of body.matchAll(/\]\((\/[^)#?\s]*)[^)]*\)/g)) {
    const path = href.replace(/\/+$/, '') || '/';
    if (!routes.has(path)) problems.push(`${e.file}: link nội bộ hỏng ${href}`);
  }
}

const todos = Object.values(entries).flat().filter((e) => /TODO/.test(e.text)).map((e) => e.file);
if (todos.length) console.log(`Lưu ý: còn TODO cần xác minh trong ${todos.length} file:\n  ${todos.join('\n  ')}`);

if (problems.length) {
  console.error(`\n${problems.length} lỗi nội dung:\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log(`\nNội dung OK (${Object.values(entries).flat().length} file).`);
