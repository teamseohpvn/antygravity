// Bật / tắt bài viết bằng trường `active` trong frontmatter (xem docs/CAU-TRUC-NOI-DUNG.md mục "Bật / tắt bài").
// File này cho scripts/ (check-content, list-images), đọc thẳng file .md, không qua astro:content.
// Trên web, lọc bằng src/lib/content.ts và bỏ link bằng src/components/ContentBody.astro.
//   active: true  → build ra trang, có trong sitemap, menu, danh sách.
//   active: false hoặc thiếu trường → không build trang; link tới trang đó trong thân bài khác tự bỏ (giữ chữ).
// Trang sản phẩm chỉ hiện khi cả sản phẩm và danh mục của nó đều active.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('../..', import.meta.url).pathname;
export const CONTENT_DIRS = { danhmuc: 'src/content/danhmuc', sanpham: 'src/content/sanpham', blog: 'src/content/blog' };

const frontmatter = (text) => text.split(/^---\s*$/m)[1] ?? '';
const field = (fm, key) => fm.match(new RegExp(`^${key}:\\s*"?([^"\\n#]*?)"?\\s*(#.*)?$`, 'm'))?.[1];

/** Mọi bài viết kèm URL và trạng thái hiển thị. */
export function contentPages() {
  const list = [];
  for (const [kind, dir] of Object.entries(CONTENT_DIRS)) {
    if (!existsSync(join(ROOT, dir))) continue;
    for (const f of readdirSync(join(ROOT, dir)).filter((f) => f.endsWith('.md')).sort()) {
      const fm = frontmatter(readFileSync(join(ROOT, dir, f), 'utf8'));
      const id = f.replace(/\.md$/, '');
      const category = field(fm, 'category');
      const path = kind === 'danhmuc' ? `/${id}` : kind === 'sanpham' ? `/${category}/${id}` : field(fm, 'duong_dan')?.trim() || `/ho-tro-ky-thuat/${id}`;
      const activeRaw = field(fm, 'active');
      // date / updated (YYYY-MM-DD): cho <lastmod> trong sitemap và check-content.
      const date = field(fm, 'date')?.trim() || undefined;
      const updated = field(fm, 'updated')?.trim() || undefined;
      list.push({ kind, id, file: `${dir}/${f}`, path, category, date, updated, hasActive: activeRaw !== undefined, selfActive: activeRaw === 'true' });
    }
  }
  const activeCats = new Set(list.filter((p) => p.kind === 'danhmuc' && p.selfActive).map((p) => p.id));
  for (const p of list) p.active = p.selfActive && (p.kind !== 'sanpham' || activeCats.has(p.category));
  return list;
}
