// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import { readdirSync } from 'node:fs';

// Domain chính thức: đặt PUBLIC_SITE_URL khi build production (https://daucongnghiephp.com.vn).
const SITE = (process.env.PUBLIC_SITE_URL || 'https://daucongnghiephp.com.vn').replace(/\/+$/, '');

// Danh sách ảnh trong public/images, đọc lúc build (prerender chạy trong workerd, không dùng được node:fs).
// Dùng để bỏ qua ảnh danh mục chưa tạo và sinh srcset (xem src/lib/site.ts).
const PUBLIC_IMAGES = readdirSync('public/images', { recursive: true })
  .map((f) => '/images/' + String(f).replaceAll('\\', '/'))
  .filter((f) => /\.(webp|avif|jpe?g|png|svg)$/.test(f));

// https://astro.build/config
export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  // Xuất /dau-thuy-luc.html thay vì /dau-thuy-luc/index.html để Cloudflare phục vụ
  // URL không có "/" cuối trực tiếp (trước đây bị redirect 307 sang URL có "/").
  build: { format: 'file' },
  // Site không dùng Astro sessions. Tắt để adapter không yêu cầu KV binding "SESSION"
  // (deploy từng lỗi khi wrangler cố tạo lại namespace "antygravity-session" đã tồn tại).
  session: false,
  vite: { define: { __PUBLIC_IMAGES__: JSON.stringify(PUBLIC_IMAGES) } },
  adapter: cloudflare(),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/bao-gia-thanh-cong') && !page.includes('/api/'),
    }),
    react(),
  ],
});
