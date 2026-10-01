// Chuyển ảnh gốc trong anh-goc/ thành WebP nhẹ trong public/images/.
//
//   anh-goc/danh-muc/dau-thuy-luc.png  ->  public/images/danh-muc/dau-thuy-luc.webp      (rộng tối đa 1200px)
//                                          public/images/danh-muc/dau-thuy-luc-600.webp  (rộng 600px, cho mobile/thẻ)
//
// Chạy: npm run images
// Thư mục anh-goc/ không commit (ảnh gốc nặng); chỉ commit file .webp đã tối ưu.
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'anh-goc';
const OUT = 'public/images';
const EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);
const SIZES = [
  { suffix: '', width: 1200, quality: 72 },
  { suffix: '-600', width: 600, quality: 70 },
];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXT.has(path.extname(entry.name).toLowerCase())) yield full;
  }
}

try {
  await stat(SRC);
} catch {
  console.error(`Không thấy thư mục ${SRC}/. Đặt ảnh gốc vào đó, ví dụ ${SRC}/danh-muc/dau-thuy-luc.png`);
  process.exit(1);
}

for await (const file of walk(SRC)) {
  const rel = path.relative(SRC, file);
  const base = rel.slice(0, -path.extname(rel).length);
  await mkdir(path.join(OUT, path.dirname(rel)), { recursive: true });
  for (const { suffix, width, quality } of SIZES) {
    const out = path.join(OUT, `${base}${suffix}.webp`);
    const info = await sharp(file)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality })
      .toFile(out);
    console.log(`${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
  }
}
