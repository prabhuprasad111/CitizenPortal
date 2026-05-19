import { publicAssetUrl } from '@/lib/publicAssetUrl';

/** Normalize static HTML paths for Vite base + HashRouter. */
export function rewriteLegacyHtml(html: string): string {
  const assets = publicAssetUrl('assets/');
  return html
    .replace(/\b(src|href)=(["'])assets\//g, `$1=$2${assets}`)
    .replace(/\b(src|href)=(["'])\/assets\//g, `$1=$2${publicAssetUrl('/assets/')}`)
    .replace(/\bindex\.html#/g, '#')
    .replace(/href=(["'])login\.html\1/g, 'href="#/login"')
    .replace(/href=(["'])photo-gallery\.html\1/g, 'href="#/photo-gallery"')
    .replace(/href=(["'])\/index\.html\1/g, 'href="#/"')
    .replace(/href=(["'])index\.html\1/g, 'href="#/"')
    .replace(/href=(["'])\/login\1/g, 'href="#/login"')
    .replace(/href=(["'])\/photo-gallery\1/g, 'href="#/photo-gallery"');
}
