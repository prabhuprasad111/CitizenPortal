import { existsSync, mkdirSync, symlinkSync, rmSync } from 'fs';
import { join } from 'path';

const root = join(import.meta.dirname, '..');
const assetsSrc = join(root, 'assets');
const publicDir = join(root, 'public');
const assetsLink = join(publicDir, 'assets');

if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

if (existsSync(assetsLink)) {
  try {
    rmSync(assetsLink, { recursive: true, force: true });
  } catch {
    /* junction */
  }
}

try {
  symlinkSync(assetsSrc, assetsLink, 'junction');
  console.log('Linked public/assets -> assets');
} catch (err) {
  console.warn('Could not create junction; copy assets into public/assets manually.', err.message);
}
