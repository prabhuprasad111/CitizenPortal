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
}

const defaultUserData = (): UserFlowData => ({ requestNumber: '', serviceType: null });

let session: ChatbotSession = {
  state: 'idle',
  userData: defaultUserData(),
  threadBootstrapped: false,
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
  };
}
