// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// Domain chính thức: đặt PUBLIC_SITE_URL khi build production (ví dụ https://daucongnghiep-pro.vn).
const SITE = (process.env.PUBLIC_SITE_URL || 'https://antygravity.nhadat339shangdao.workers.dev').replace(/\/+$/, '');

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
  adapter: cloudflare(),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/bao-gia-thanh-cong') && !page.includes('/api/'),
    }),
    react(),
  ],
});
