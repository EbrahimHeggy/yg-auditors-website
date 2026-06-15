import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://yg-auditors.com',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});