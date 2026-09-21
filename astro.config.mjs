// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://antygravity.nhadat339shangdao.workers.dev',
  adapter: cloudflare(),
  integrations: [sitemap(), react()],
});
