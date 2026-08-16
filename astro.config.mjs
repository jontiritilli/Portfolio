import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.jonathantiritilli.com',
  build: {
    assets: 'static',
  },
  integrations: [sitemap()],
});
