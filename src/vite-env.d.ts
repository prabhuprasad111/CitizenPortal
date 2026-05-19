/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_API_PROXY_TARGET?: string;
  readonly VITE_API_SERVICE_STATUS_PATH?: string;
  readonly VITE_API_AI_CHAT_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.html?raw' {
  const content: string;
  export default content;
}
