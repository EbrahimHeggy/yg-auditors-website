import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

type Fallback =
  | { kind: 'localized-file'; file: string }
  | { kind: 'single-file'; file: string; id: string }
  | { kind: 'folder'; dir: string };

type Entry = { id: string } & Record<string, unknown>;

async function loadFallback(fallback: Fallback): Promise<Entry[]> {
  if (fallback.kind === 'localized-file') {
    const raw = JSON.parse(await readFile(fallback.file, 'utf-8'));
    return Object.entries(raw).map(([id, data]) => ({ id, ...(data as Record<string, unknown>) }));
  }
  if (fallback.kind === 'single-file') {
    const raw = JSON.parse(await readFile(fallback.file, 'utf-8'));
    return [{ id: fallback.id, ...(raw as Record<string, unknown>) }];
  }
  const files = (await readdir(fallback.dir)).filter((f: string) => f.endsWith('.json'));
  return Promise.all(
    files.map(async (f: string): Promise<Entry> => {
      const raw = JSON.parse(await readFile(path.join(fallback.dir, f), 'utf-8'));
      return { id: f.replace(/\.json$/, ''), ...(raw as Record<string, unknown>) };
    })
  );
}

function snakeToCamel(key: string): string {
  return key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

/**
 * Fetches a collection's entries from a Supabase table at build time. Falls
 * back to the local src/content JSON fixtures when SUPABASE_URL/SUPABASE_ANON_KEY
 * aren't set yet (or the request fails), so the site keeps building during
 * the Supabase content-migration window. Top-level snake_case column names
 * (e.g. arabic_name) are converted to camelCase to match the existing Zod
 * schemas; jsonb column contents are left as-is since they're opaque blobs.
 */
export function supabaseLoader(table: string, fallback: Fallback) {
  return async (): Promise<Entry[]> => {
    const url = import.meta.env.SUPABASE_URL;
    const key = import.meta.env.SUPABASE_ANON_KEY;
    if (url && key) {
      try {
        const res = await fetch(`${url}/rest/v1/${table}?select=*`, {
          headers: { apikey: key, Authorization: `Bearer ${key}` },
        });
        if (res.ok) {
          const rows = (await res.json()) as Array<Record<string, unknown>>;
          return rows.map((row) => {
            const entry: Record<string, unknown> = {};
            for (const [k, v] of Object.entries(row)) {
              entry[k === 'id' ? 'id' : snakeToCamel(k)] = v;
            }
            return entry as Entry;
          });
        }
        console.error(`Supabase fetch failed for table "${table}": ${res.status} ${res.statusText}`);
      } catch (err) {
        console.error(`Error fetching from Supabase table "${table}":`, err);
      }
    }
    return loadFallback(fallback);
  };
}
