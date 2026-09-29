import type { APIRoute } from 'astro';
import { SITE_URL } from '../lib/site';

// Không chặn crawl trên staging: trang staging đã có meta robots "noindex",
// Google cần crawl được mới đọc được thẻ đó.
//
// Chính sách AI: cho phép bot tìm kiếm và bot truy cập theo yêu cầu người dùng
// (ChatGPT-User, Claude-User, Perplexity-User, Google-Agent...) để site được trích dẫn;
// chỉ chặn bot thu thập dữ liệu huấn luyện.
// LƯU Ý: Cloudflare "Managed robots.txt" chèn khối riêng lên đầu file này và chặn cả
// bot truy cập theo yêu cầu người dùng. Cần tắt trong Cloudflare > AI Crawl Control.
const TRAINING_BOTS = [
  'GPTBot',
  'ClaudeBot',
  'CCBot',
  'Google-Extended',
  'Applebot-Extended',
  'Bytespider',
  'meta-externalagent',
  'cohere-ai',
];

export const GET: APIRoute = () =>
  new Response(
    [
      'User-agent: *',
      'Content-Signal: search=yes, ai-input=yes, ai-train=no',
      'Allow: /',
      'Disallow: /api/',
      'Disallow: /bao-gia-thanh-cong',
      '',
      ...TRAINING_BOTS.map((bot) => `User-agent: ${bot}`),
      'Disallow: /',
      '',
      `Sitemap: ${SITE_URL}/sitemap-index.xml`,
      '',
    ].join('\n'),
    { headers: { 'content-type': 'text/plain; charset=utf-8' } },
  );
