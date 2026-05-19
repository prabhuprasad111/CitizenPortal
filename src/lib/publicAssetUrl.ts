/** Root-relative URL under Vite `base` (e.g. `/CitizenPortal/` on GitHub Pages). */
export function publicAssetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalized}`;
}
