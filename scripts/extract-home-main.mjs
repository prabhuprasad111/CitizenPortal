import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const root = join(import.meta.dirname, '..');
const source = join(root, 'legacy', 'index-static.html');
const html = readFileSync(source, 'utf8');
const match = html.match(/<main[^>]*>([\s\S]*)<\/main>/i);
if (!match) {
  console.error('Could not find <main> in index.html');
  process.exit(1);
}
const outDir = join(root, 'src', 'content');
mkdirSync(outDir, { recursive: true });
const mainHtml = match[1].trim();
if (/α¼|ΓÇö|┬╖/.test(mainHtml)) {
  console.error(
    'home-main source looks corrupted (wrong file encoding). Run: node scripts/restore-legacy-index.mjs',
  );
  process.exit(1);
}
writeFileSync(join(outDir, 'home-main.html'), mainHtml, 'utf8');
console.log('Wrote src/content/home-main.html', mainHtml.length, 'chars');
