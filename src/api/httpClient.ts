import axios, { type AxiosInstance } from 'axios';
import { apiBase } from './config';

let client: AxiosInstance | null = null;
let clientBaseUrl: string | undefined;

/**
 * In dev, always call the Vite origin so `/api/*` proxy rules apply
 * (avoids stale `VITE_API_BASE_URL=http://localhost:5165` after .env changes).
 */
export function getEffectiveApiBaseUrl(): string | undefined {
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    return window.location.origin;
  }
  return apiBase || undefined;
}

/** Shared axios instance; base URL from env, or current origin in dev (Vite proxy). */
export function getApi(): AxiosInstance {
  const baseURL = getEffectiveApiBaseUrl();

  if (!client || clientBaseUrl !== baseURL) {
    client = axios.create({
      baseURL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 60_000,
    });
    clientBaseUrl = baseURL;
  }

  return client;
}
