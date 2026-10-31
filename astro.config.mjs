// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const basePath = (process.env.BASE_PATH || '/').replace(/\/+$/, '') || '/';

/**
 * Automatically prefixes root-relative href="/..." and src="/..." attributes
 * in built HTML files when deployed under a GitHub Pages subpath (e.g. /portfolio).
 */
function githubPagesBasePrefixer() {
  return {
    name: 'github-pages-base-prefixer',
    hooks: {
      /** @param {{ dir: URL }} params */
      'astro:build:done': async ({ dir }) => {
        if (basePath === '/') return;
        const distPath = fileURLToPath(dir);
        const prefix = basePath.startsWith('/') ? basePath : `/${basePath}`;

        /** @param {string} currentDir */
        const walkHtml = (currentDir) => {
          for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
            const fullPath = path.join(currentDir, entry.name);
            if (entry.isDirectory()) {
              walkHtml(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.html')) {
              const html = fs.readFileSync(fullPath, 'utf-8');
              const updated = html.replace(
                /\b(href|src)="\/(?!\/)([^"]*)"/g,
                (match, attr, rest) => {
                  if (rest === '' || rest.startsWith(`${prefix.slice(1)}/`) || rest === prefix.slice(1)) {
                    return rest === '' ? `${attr}="${prefix}/"` : match;
                  }
                  return `${attr}="${prefix}/${rest}"`;
                }
              );
              if (updated !== html) {
                fs.writeFileSync(fullPath, updated, 'utf-8');
              }
            }
          }
        };

        walkHtml(distPath);
      }
    }
  };
}

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://iamarunjose.github.io',
  base: basePath,
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [mdx(), sitemap(), githubPagesBasePrefixer()]
});

