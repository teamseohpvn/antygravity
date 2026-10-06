// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Domain chính thức: đặt PUBLIC_SITE_URL khi build production (https://daucongnghiephp.com.vn).
const SITE = (process.env.PUBLIC_SITE_URL || 'https://daucongnghiephp.com.vn').replace(/\/+$/, '');

// Danh sách ảnh trong public/images, đọc lúc build (prerender chạy trong workerd, không dùng được node:fs).
// Dùng để bỏ qua ảnh danh mục chưa tạo và sinh srcset (xem src/lib/site.ts).
const PUBLIC_IMAGES = readdirSync('public/images', { recursive: true })
  .map((f) => '/images/' + String(f).replaceAll('\\', '/'))
  .filter((f) => /\.(webp|avif|jpe?g|png|svg)$/.test(f));

// Ảnh giữ nguyên tên khi thay ảnh mới, trình duyệt lại cache /images/* 7 ngày (public/_headers),
// nên khách cũ vẫn thấy ảnh cũ. Sau khi build, gắn ?v=<mã nội dung> vào mọi đường dẫn /images/...
// trong HTML: ảnh đổi nội dung thì URL đổi, trình duyệt tải ảnh mới ngay.
function imageCacheBust() {
  let clientDir;
  return {
    name: 'image-cache-bust',
    hooks: {
      'astro:config:done': ({ config }) => { clientDir = fileURLToPath(config.build.client); },
      'astro:build:done': () => {
        const hashes = new Map();
        const version = (img) => {
          if (!hashes.has(img)) {
            try {
              hashes.set(img, createHash('md5').update(readFileSync(path.join('public', img))).digest('hex').slice(0, 8));
            } catch {
              hashes.set(img, null);
            }
          }
          return hashes.get(img);
        };
        let files = 0;
        for (const f of readdirSync(clientDir, { recursive: true })) {
          if (!String(f).endsWith('.html')) continue;
          const file = path.join(clientDir, String(f));
          const html = readFileSync(file, 'utf8');
          const out = html.replace(/\/images\/[\w\-/.]+?\.(?:webp|avif|png|jpe?g|svg)(?![\w?])/g, (img) => {
            const v = version(img);
            return v ? `${img}?v=${v}` : img;
          });
          if (out !== html) { writeFileSync(file, out); files++; }
        }
        console.log(`[image-cache-bust] gắn ?v= cho ảnh trong ${files} trang`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  // Xuất /dau-thuy-luc.html thay vì /dau-thuy-luc/index.html để Cloudflare phục vụ
  // URL không có "/" cuối trực tiếp (trước đây bị redirect 307 sang URL có "/").
  // inlineStylesheets: CSS chỉ ~6 KB, nhúng thẳng vào HTML để bỏ file CSS chặn hiển thị (render-blocking).
  build: { format: 'file', inlineStylesheets: 'always' },
  // Site không dùng Astro sessions. Tắt để adapter không yêu cầu KV binding "SESSION"
  // (deploy từng lỗi khi wrangler cố tạo lại namespace "antygravity-session" đã tồn tại).
  session: false,
  vite: {
    define: { __PUBLIC_IMAGES__: JSON.stringify(PUBLIC_IMAGES) },
    // Giữ cú pháp @media (max-width: …) cũ: cú pháp mới (width<=…) không chạy trên iPhone iOS < 16.4
    // và công cụ kiểm tra SEO báo "không dùng media query".
    build: { cssTarget: ['chrome87', 'safari14', 'firefox78', 'edge88'] },
  },
  adapter: cloudflare(),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/bao-gia-thanh-cong') && !page.includes('/api/'),
    }),
    react(),
    imageCacheBust(),
  ],
});
