// Liệt kê mọi ảnh mà các bài viết đang khai báo, để biết cần up ảnh gốc tên gì.
//
// Quét src/content/{danhmuc,sanpham,blog}: trường image, images (src/alt) và ảnh chèn trong thân bài ![alt](/images/...).
// Ghi ra:
//   docs/ANH-CAN-CHUP.md     bảng đọc nhanh
//   docs/danh-sach-anh.csv   mở bằng Excel (cột "Tên file cần up" là tên ảnh gốc đặt vào anh-goc/)
// Trạng thái: "da-co" khi đã có ảnh gốc trong anh-goc/ hoặc bản .webp trong public/images/.
// Chỉ bài đang bật (active: true) mới tính vào danh sách cần up. Bài đang tắt nhưng có hàng
// (stock_status: "co-san", thường là bài chờ TDS) có bảng riêng để chụp trước; bài tắt khác chỉ ghi số lượng.
// Chạy: npm run anh
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { contentPages } from '../src/lib/active-pages.mjs';

const ROOT = new URL('..', import.meta.url).pathname;
const DIRS = { danhmuc: 'src/content/danhmuc', sanpham: 'src/content/sanpham', blog: 'src/content/blog' };
const LOAI = { danhmuc: 'Danh mục', sanpham: 'Sản phẩm', blog: 'Bài viết' };
const SRC_EXT = ['.jpg', '.jpeg', '.png', '.webp'];

const field = (text, key) => text.match(new RegExp(`^${key}:\\s*"(.*)"\\s*$`, 'm'))?.[1];

const activeFiles = new Set(contentPages().filter((p) => p.active).map((p) => p.file));
const rows = [];
for (const [kind, dir] of Object.entries(DIRS)) {
  if (!existsSync(join(ROOT, dir))) continue;
  for (const f of readdirSync(join(ROOT, dir)).filter((f) => f.endsWith('.md')).sort()) {
    const text = readFileSync(join(ROOT, dir, f), 'utf8');
    const [, fm = '', ...rest] = text.split(/^---\s*$/m);
    const body = rest.join('---');
    const id = f.replace(/\.md$/, '');
    const page = kind === 'danhmuc' ? `/${id}` : kind === 'sanpham' ? `/${field(fm, 'category')}/${id}` : `/ho-tro-ky-thuat/${id}`;
    const active = activeFiles.has(`${dir}/${f}`);
    const inStock = field(fm, 'stock_status') === 'co-san';
    const add = (src, alt, vitri) => rows.push({ kind, page, file: `${dir}/${f}`, src, alt: alt ?? '', vitri, active, inStock });

    const cover = field(fm, 'image');
    if (cover) add(cover, field(fm, 'image_alt'), 'Ảnh chính');
    for (const m of fm.matchAll(/\{\s*src:\s*"([^"]+)"(?:\s*,\s*alt:\s*"([^"]*)")?\s*\}/g)) add(m[1], m[2], 'Ảnh sản phẩm');
    for (const m of body.matchAll(/!\[([^\]]*)\]\((\/images\/[^)\s]+)\)/g)) add(m[2], m[1], 'Trong thân bài');
  }
}

// /images/blog/abc.webp -> thư mục anh-goc/blog, tên gốc abc
for (const r of rows) {
  const rel = r.src.replace(/^\/images\//, '').replace(/\.webp$/, '');
  r.folder = `anh-goc/${dirname(rel) === '.' ? '' : dirname(rel) + '/'}`;
  r.upload = `${rel.split('/').pop()}.jpg`;
  const hasSource = SRC_EXT.some((ext) => existsSync(join(ROOT, 'anh-goc', rel + ext)));
  r.status = hasSource || existsSync(join(ROOT, 'public', r.src)) ? 'da-co' : 'thieu';
}

// Một ảnh có thể dùng ở nhiều trang (vd. ảnh danh mục làm ảnh bìa bài viết): chỉ cần up một lần.
// Ảnh dùng ở cả bài bật lẫn bài tắt được tính là ảnh của bài bật.
const activeRows = rows.filter((r) => r.active);
const unique = [...new Map(activeRows.map((r) => [r.src, r])).values()];
const missing = unique.filter((r) => r.status === 'thieu');
const activeSrc = new Set(unique.map((r) => r.src));
const hiddenOnly = [...new Map(rows.filter((r) => !r.active && !activeSrc.has(r.src)).map((r) => [r.src, r])).values()];
const pending = hiddenOnly.filter((r) => r.inStock);
const pendingMissing = pending.filter((r) => r.status === 'thieu');

const csvCell = (v) => `"${String(v).replace(/"/g, '""')}"`;
const csv = [
  ['Trạng thái', 'Thư mục', 'Tên file cần up', 'Nội dung ảnh (alt)', 'Vị trí', 'Loại', 'Trang', 'File bài viết', 'Bài đang bật'],
  ...[...activeRows, ...rows.filter((r) => !r.active)].map((r) => [
    !r.active ? (r.inStock ? (r.status === 'thieu' ? 'THIẾU (chờ TDS)' : 'Đã có (chờ TDS)') : 'Bài đang tắt') : r.status === 'thieu' ? 'THIẾU' : 'Đã có',
    r.folder, r.upload, r.alt, r.vitri, LOAI[r.kind], r.page, r.file, r.active ? 'Có' : 'Không',
  ]),
].map((line) => line.map(csvCell).join(',')).join('\r\n');
writeFileSync(join(ROOT, 'docs/danh-sach-anh.csv'), '﻿' + csv);

const today = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
const table = (list) =>
  ['| Thư mục | Tên file cần up | Nội dung ảnh (alt) | Trang |', '|---|---|---|---|',
    ...list.map((r) => `| \`${r.folder}\` | \`${r.upload}\` | ${r.alt || '**(chưa có alt)**'} | ${r.page} |`)].join('\n');
const md = `# Danh sách ảnh cần chụp / tạo

Sinh tự động bằng \`npm run anh\` ngày ${today} từ các file \`.md\`. **Không sửa tay**, sửa bài viết rồi chạy lại lệnh.
Bản Excel: \`docs/danh-sach-anh.csv\` (lọc cột "Trạng thái" = THIẾU).

Cách dùng: đặt ảnh gốc vào đúng **thư mục**, đặt **đúng tên** trong cột "Tên file cần up" (đuôi .jpg, .png hoặc .webp đều được), rồi chạy \`npm run images\`.

| Loại | Tỉ lệ | Ảnh gốc tối thiểu | Ghi chú |
|---|---|---|---|
| Sản phẩm (\`anh-goc/san-pham/\`) | 1:1 vuông | 1200 × 1200 px (khuyến nghị 1600 × 1600) | Ảnh **chụp thật** trong kho, nền sáng trơn, sản phẩm ở giữa chiếm 70–80% khung, không chèn chữ/logo |
| Danh mục (\`anh-goc/danh-muc/\`) | 3:2 ngang | 1536 × 1024 px | Được dùng ảnh AI, không logo, không chữ (xem \`docs/prompt-anh-danh-muc.md\`) |
| Bài viết (\`anh-goc/blog/\`) | 16:9 | 1200 × 675 px (khuyến nghị 1600 × 900) | Ảnh minh họa được dùng AI; ảnh "thực tế tại kho/xưởng" phải là ảnh thật |

Chỉ tính bài đang bật (\`active: true\`). Tổng: ${unique.length} ảnh, đã có ${unique.length - missing.length}, **còn thiếu ${missing.length}**.

## Ảnh còn thiếu

${missing.length ? table(missing) : 'Không còn ảnh nào thiếu.'}

## Ảnh đã có

${table(unique.filter((r) => r.status === 'da-co'))}

## Ảnh của bài có hàng nhưng đang tắt (chờ TDS) – nên chụp luôn

Các trang này đã viết, sẽ bật khi có TDS. Chụp trước để bật trang là có ảnh ngay. Còn thiếu ${pendingMissing.length}/${pending.length} ảnh.

${pendingMissing.length ? table(pendingMissing) : 'Không còn ảnh nào thiếu.'}

## Ảnh của bài đang tắt khác (chưa cần up)

${hiddenOnly.length - pending.length} ảnh thuộc các bài \`active: false\` không có trong kho hiện tại. Khi bật bài nào, chạy lại \`npm run anh\` để ảnh của bài đó vào danh sách cần up.
Danh sách đầy đủ trong \`docs/danh-sach-anh.csv\` (cột "Trạng thái" = Bài đang tắt).
`;
writeFileSync(join(ROOT, 'docs/ANH-CAN-CHUP.md'), md);

const byFolder = Object.groupBy(missing, (r) => r.folder);
for (const [folder, list] of Object.entries({ ...byFolder, ...(pendingMissing.length ? { 'chờ TDS → anh-goc/san-pham/': pendingMissing } : {}) })) {
  console.log(`\n${folder}  (${list.length} ảnh thiếu)`);
  for (const r of list) console.log(`  ${r.upload}`);
}
console.log(`\nBài đang bật: ${unique.length} ảnh, đã có ${unique.length - missing.length}, thiếu ${missing.length}. Chờ TDS: thiếu ${pendingMissing.length} ảnh. Bài tắt khác: ${hiddenOnly.length - pending.length} ảnh (chưa cần up).`);
console.log('Đã ghi docs/ANH-CAN-CHUP.md và docs/danh-sach-anh.csv');
