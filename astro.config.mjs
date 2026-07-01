import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { existsSync, readFileSync } from 'node:fs';
import { loadEnv } from 'vite';
import { handleConsultation } from './src/lib/consultation-handler.ts';

function loadDevVars() {
  const path = '.dev.vars';
  if (!existsSync(path)) return {};
  return Object.fromEntries(
    readFileSync(path, 'utf8')
      .split('\n')
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const index = line.indexOf('=');
        return [line.slice(0, index), line.slice(index + 1)];
      }),
  );
}

function consultationDevApi() {
  return {
    name: 'consultation-dev-api',
    configureServer(server) {
      const env = { ...loadDevVars(), ...loadEnv('development', process.cwd(), '') };

      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];
        if (req.method !== 'POST' || url !== '/api/consultation') {
          return next();
        }

        let raw = '';
        req.on('data', (chunk) => {
          raw += chunk;
        });
        req.on('end', async () => {
          try {
            const body = raw ? JSON.parse(raw) : {};
            const result = await handleConsultation(body, {
              RESEND_API_KEY: env.RESEND_API_KEY,
              LEAD_NOTIFY_EMAIL: env.LEAD_NOTIFY_EMAIL,
            });
            res.statusCode = result.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result.body));
          } catch (err) {
            console.error('Consultation dev API error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Internal server error' }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  site: 'https://yg-auditors.com',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
  },

  vite: {
    plugins: [tailwindcss(), consultationDevApi()],
  },
});
