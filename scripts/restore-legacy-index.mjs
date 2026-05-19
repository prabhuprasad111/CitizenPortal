/**
 * Restores legacy/index-static.html from git (UTF-8) and re-extracts home-main.html.
 * Use when Odia text shows as mojibake (e.g. α¼, ΓÇö).
 */
import { execSync } from 'child_process';
import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const root = join(import.meta.dirname, '..');
const legacyPath = join(root, 'legacy', 'index-static.html');

const html = execSync('git show HEAD:index.html', {
  cwd: root,
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024,
});

writeFileSync(legacyPath, html, 'utf8');
console.log('Restored', legacyPath);

const match = html.match(/<main[^>]*>([\s\S]*)<\/main>/i);
if (!match) {
  console.error('Could not find <main> in index.html');
  process.exit(1);
}
const outDir = join(root, 'src', 'content');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'home-main.html'), match[1].trim(), 'utf8');
console.log('Wrote src/content/home-main.html', match[1].length, 'chars');

const sample = readFileSync(join(outDir, 'home-main.html'), 'utf8');
if (/α¼|ΓÇö/.test(sample)) {
  console.error('Warning: extracted content still looks corrupted');
  process.exit(1);
}
if (!/ଲଗଇନ୍|lang-or/.test(sample)) {
  console.warn('Warning: no Odia sample found in extract (check source)');
}
