import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const root = join(import.meta.dirname, '..');
const html = readFileSync(join(root, 'login.html'), 'utf8');
const match = html.match(/<main[^>]*>([\s\S]*)<\/main>/i);
if (!match) {
  console.error('Could not find <main> in login.html');
  process.exit(1);
}
const outDir = join(root, 'src', 'content');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'login-main.html'), match[1].trim(), 'utf8');
console.log('Wrote src/content/login-main.html');
