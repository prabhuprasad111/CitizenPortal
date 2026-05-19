/** @deprecated Import from `@/api/config` — kept for AI chat fetch. */
export { aiChatPath, apiBase, serviceStatusPath } from '@/api/config';

import { apiBase } from '@/api/config';

export const useDevProxy = import.meta.env.DEV && !apiBase;

export function resolveApiUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return apiBase ? `${apiBase}${normalized}` : normalized;
}

export function logApiTarget(label: string, url: string): void {
  if (import.meta.env.DEV) {
    const via = useDevProxy ? ' (Vite proxy → ' + (import.meta.env.VITE_API_PROXY_TARGET || '5165') + ')' : '';
    console.info(`[CitizenPortal API] ${label}: ${url}${via}`);
  }
}
