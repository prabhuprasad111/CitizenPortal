/** API base URL and paths from Vite env (no hardcoded hosts). */

const rawBase = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() ?? '';

export const apiBase = rawBase.replace(/\/$/, '');

export const serviceStatusPath =
  (import.meta.env.VITE_API_SERVICE_STATUS_PATH as string | undefined)?.trim() ||
  '/api/service/status';

export const aiChatPath =
  (import.meta.env.VITE_API_AI_CHAT_PATH as string | undefined)?.trim() || '/api/ai/chat';
