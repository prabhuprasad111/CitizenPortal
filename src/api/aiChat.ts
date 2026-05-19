import { aiChatPath } from './config';
import { getEffectiveApiBaseUrl } from './httpClient';

/** POST /api/ai/chat — dev: Vite proxy → Python /chat; prod: .NET or configured base */
export interface AiChatRequestBody {
  message: string;
}

export interface AiChatResponseBody {
  response?: string;
  message?: string;
  reply?: string;
  content?: string;
}

export function resolveAiChatUrl(): string {
  const path = aiChatPath.startsWith('/') ? aiChatPath : `/${aiChatPath}`;
  const base = getEffectiveApiBaseUrl();
  if (base) {
    return `${base.replace(/\/$/, '')}${path}`;
  }
  if (typeof window !== 'undefined') {
    return new URL(path, window.location.origin).href;
  }
  return path;
}

/**
 * POST /api/ai/chat using fetch (visible in DevTools Network).
 * Body: { message }. Reads response.response | message | content.
 */
export async function sendToAI(message: string): Promise<string> {
  const trimmed = message.trim();
  if (!trimmed) {
    throw new Error('Message is empty');
  }

  const url = resolveAiChatUrl();
  console.log('Calling AI API:', trimmed, '→', url);

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: trimmed } satisfies AiChatRequestBody),
    });
  } catch (error) {
    console.error('AI API error:', error, { url });
    throw error;
  }

  if (!res.ok) {
    console.error('AI API error: HTTP', res.status, url);
    throw new Error(`AI chat failed (${res.status})`);
  }

  let data: AiChatResponseBody;
  try {
    data = (await res.json()) as AiChatResponseBody;
  } catch (error) {
    console.error('AI API error: invalid JSON', error);
    throw new Error('Invalid AI response');
  }

  console.log('AI response:', data);

  const text = data.response ?? data.message ?? data.reply ?? data.content;
  if (!text?.trim()) {
    throw new Error('Empty AI response');
  }

  const reply = text.trim();
  if (/^ai service unavailable$/i.test(reply)) {
    throw new Error('AI service unavailable');
  }

  return reply;
}
