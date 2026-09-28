import type { APIRoute } from 'astro';
import { SITE_URL } from '../lib/site';

// Không chặn crawl trên staging: trang staging đã có meta robots "noindex",
// Google cần crawl được mới đọc được thẻ đó.
export const GET: APIRoute = () =>
  new Response(
    [
      'User-agent: *',
      'Allow: /',
      'Disallow: /api/',
      'Disallow: /bao-gia/da-gui',
      '',
      `Sitemap: ${SITE_URL}/sitemap-index.xml`,
      '',
    ].join('\n'),
    { headers: { 'content-type': 'text/plain; charset=utf-8' } },
  );
