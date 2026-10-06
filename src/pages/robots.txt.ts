import type { APIRoute } from 'astro';
import { SITE_URL } from '../lib/site';

// Không chặn crawl trên staging: trang staging đã có meta robots "noindex",
// Google cần crawl được mới đọc được thẻ đó.
//
// Chính sách AI (06/10/2026): mở cho tất cả bot AI (tìm kiếm, truy cập theo yêu cầu
// người dùng, huấn luyện) để tối đa khả năng được AI trích dẫn (GEO).
// LƯU Ý: Cloudflare "Managed robots.txt" chèn khối riêng lên đầu file này và chặn bot AI.
// Cần tắt trong Cloudflare > AI Crawl Control, và tắt "Block AI bots" nếu đang bật.

export const GET: APIRoute = () =>
  new Response(
    [
      'User-agent: *',
      'Content-Signal: search=yes, ai-input=yes, ai-train=yes',
      'Allow: /',
      'Disallow: /api/',
      'Disallow: /bao-gia-thanh-cong',
      'Disallow: /quan-tri',
      '',
      `Sitemap: ${SITE_URL}/sitemap-index.xml`,
      '',
    ].join('\n'),
    { headers: { 'content-type': 'text/plain; charset=utf-8' } },
  );
