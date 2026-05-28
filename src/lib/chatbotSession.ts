/** Persists SAKHI flow state across chatbot re-initializations (e.g. route/hash effects). */

export type ChatbotState = 'idle' | 'waiting_request_number' | 'waiting_service_type';

export interface UserFlowData {
  requestNumber: string;
  serviceType: number | null;
}

export interface ChatbotSession {
  state: ChatbotState;
  userData: UserFlowData;
  threadBootstrapped: boolean;
  /** Stable conversation ID sent to the AI backend for multi-turn state. */
  sessionId: string;
}

const defaultUserData = (): UserFlowData => ({ requestNumber: '', serviceType: null });

/** Generate a simple unique session ID (UUID v4-like). */
function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

let session: ChatbotSession = {
  state: 'idle',
  userData: defaultUserData(),
  threadBootstrapped: false,
  sessionId: generateSessionId(),
};

export function getChatbotSession(): ChatbotSession {
  return session;
}

export function patchChatbotSession(patch: Partial<ChatbotSession>): void {
  session = {
    ...session,
    ...patch,
    userData: patch.userData ? { ...patch.userData } : { ...session.userData },
  };
}

export function resetChatbotSession(): void {
  session = {
    state: 'idle',
    userData: defaultUserData(),
    threadBootstrapped: false,
    sessionId: generateSessionId(),
  };
}
