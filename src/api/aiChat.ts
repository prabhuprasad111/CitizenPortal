import { aiChatPath } from './config';
import { getEffectiveApiBaseUrl } from './httpClient';

/** POST /api/ai/chat — dev: Vite proxy → .NET → Python; prod: .NET gateway */
export interface AiChatRequestBody {
  message: string;
  session_id?: string;
}

export interface AiChatResponseBody {
  response?: string;
  message?: string;
  reply?: string;
  content?: string;
  type?: string;        // "answer" | "confirmation"
  options?: string[];   // e.g. ["Yes", "No"]
}

/** Structured result returned by sendToAI — includes type and options for confirmations. */
export interface AiChatResult {
  text: string;
  type: 'answer' | 'confirmation';
  options?: string[];
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
 * Body: { message, session_id? }. Returns structured result with type and options.
 */
export async function sendToAI(message: string, sessionId?: string): Promise<AiChatResult> {
  const trimmed = message.trim();
  if (!trimmed) {
    throw new Error('Message is empty');
  }

  const url = resolveAiChatUrl();
  console.log('Calling AI API:', trimmed, '→', url);

  const body: AiChatRequestBody = { message: trimmed };
  if (sessionId) {
    body.session_id = sessionId;
  }

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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

  return {
    text: reply,
    type: (data.type === 'confirmation' ? 'confirmation' : 'answer') as 'answer' | 'confirmation',
    options: data.options,
  };
}
