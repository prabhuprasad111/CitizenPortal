import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const root = join(import.meta.dirname, '..');
const home = readFileSync(join(root, 'src', 'content', 'home-main.html'), 'utf8');
const legacyPath = join(root, 'legacy', 'index-static.html');
const legacy = readFileSync(legacyPath, 'utf8');
const match = legacy.match(/<main[^>]*>[\s\S]*<\/main>/i);
if (!match) {
  console.error('Could not find <main> in legacy/index-static.html');
  process.exit(1);
}
const updated = legacy.replace(match[0], `<main id="main" class="main">\n${home.trim()}\n    </main>`);
writeFileSync(legacyPath, updated, 'utf8');
console.log('Synced legacy/index-static.html <main> from src/content/home-main.html');
