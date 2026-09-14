// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://antygravity.nhadat339shangdao.workers.dev',
  integrations: [sitemap()],
});
