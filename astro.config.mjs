// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The public origin. Override at build time with SITE_URL when deploying to a
// different host (for example a preview URL); canonical, OG and sitemap URLs
// are all derived from it.
// Production domain confirmed by the owner.
const site = process.env.SITE_URL ?? 'https://ahmed-rajab-developer.com';

export default defineConfig({
  site,
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
