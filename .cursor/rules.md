# Citizen Portal — Project Rules

## Tech stack

- **React 18** + **TypeScript** + **Vite** (`npm run dev` → `http://localhost:5173`)
- **React Router** — routes in `src/App.tsx`, layout in `src/components/layout/`
- **Bootstrap 5** + **Bootstrap Icons** — global CSS in `assets/css/main.css` (imported via `src/styles/index.css`)
- **Legacy static assets** — `assets/` (images, vendor, `portal-chatbot.css`); synced to `public/assets` via `scripts/setup-public.mjs`
- **Home page body** — extracted HTML in `src/content/home-main.html` (from `legacy/index-static.html`), rendered in `HomePage.tsx`
- **Swiper**, **ApexCharts**, **ECharts** — hero charts (`assets/js/portal-hero-charts.js`), Odisha map (`src/lib/portalAboutMap.ts`, `assets/data/odisha-districts.geojson`)
- **axios** — service status API (`src/api/serviceStatus.ts`)
- **fetch** — AI chat (`src/api/aiChat.ts`)

Do **not** treat this repo as a vanilla multi-page HTML-only site for new features; add React components and `src/lib/` modules unless explicitly asked to change legacy HTML only.

## Repository layout (key paths)

| Area | Path |
|------|------|
| App entry | `src/main.tsx`, `src/App.tsx` |
| Pages | `src/pages/` (`HomePage`, `LoginPage`, `PhotoGalleryPage`) |
| Layout | `PortalLayout`, `PortalHeader`, `PortalFooter`, `PortalChatbot` |
| SAKHI chatbot logic | `src/lib/portalChatbot.ts`, `chatbotTopics.ts`, `chatbotSession.ts`, `chatbotCopy.ts` |
| APIs | `src/api/config.ts`, `httpClient.ts`, `serviceStatus.ts`, `aiChat.ts` |
| Effects (AOS, swiper, map, charts) | `src/hooks/usePortalEffects.ts` |
| Styles | `assets/css/main.css`, `assets/css/portal-chatbot.css` |
| Env | `.env.local`, `.env.development`, `.env.example` |
| Vite proxy | `vite.config.ts` |

## API architecture

**Target production flow:** Browser → .NET API → Python AI → Ollama

| Endpoint | Purpose | Dev routing |
|----------|---------|-------------|
| `POST /api/service/status` | Service request status | Vite proxy → `VITE_API_PROXY_TARGET` (default `:5165`) |
| `POST /api/ai/chat` | SAKHI free-text AI | Vite proxy → `VITE_API_AI_PROXY_TARGET` (default `:8000/chat`) |

**Development (recommended):** leave `VITE_API_BASE_URL` empty so the browser calls same-origin `/api/*` and Vite proxies:

```env
VITE_API_BASE_URL=
VITE_API_PROXY_TARGET=http://localhost:5165
VITE_API_AI_PROXY_TARGET=http://localhost:8000
VITE_API_SERVICE_STATUS_PATH=/api/service/status
VITE_API_AI_CHAT_PATH=/api/ai/chat
```

Restart `npm run dev` after any `.env` change.

**Python contract:** `POST /chat` with `{ "message": "..." }` → `{ "response": "..." }`  
**Do not** send `{ "messages": [...] }` from .NET unless Python is updated to match.

**Direct .NET:** set `VITE_API_BASE_URL=http://localhost:5165` only if CORS allows `http://localhost:5173`. In dev, `getEffectiveApiBaseUrl()` prefers `window.location.origin` when `import.meta.env.DEV` so the proxy still works.

## SAKHI chatbot (SAKHI)

- UI shell: `src/components/layout/PortalChatbot.tsx` — init via `useEffect` → `initPortalChatbot()`
- Send button: React `onClick` → `portalChatbotSubmit()` (do not rely on DOM listeners alone)
- **Quick topics:** pill chips in `#portalChatbotQuick`; topics in `src/lib/chatbotTopics.ts` (`icon`, `chip`, `q`, `bullets`)
- **Service status flow:** `idle` → `waiting_request_number` → `waiting_service_type` → `postServiceStatus()`
- **Free-text (idle):** `sendToAI()` → `/api/ai/chat`; local FAQ fallback in `chatbotFaq.ts` only after AI failure
- Closing the panel calls `resetChat()` (clears thread)
- Do not load `assets/js/portal-chatbot.js` in the React app (legacy only)

## Footer

- Full footer: `src/components/layout/PortalFooter.tsx` (four columns + newsletter + copyright)
- Background: `footerbg.png` via `.footer` in `main.css`
- **Konark wheel:** `/assets/img/konark.png` inside `.footer-konark-rotator` — animate the **wrapper div**, not the `<img>` (`rotateClockwise` in `main.css`)

## Coding standards

- Prefer **small, focused diffs**; match existing naming and file layout
- API calls: use `src/api/*` modules; no hardcoded hosts (use `VITE_*` env)
- Bilingual UI: pair `<span class="lang-en">` / `<span class="lang-or" lang="or">` (see `main.css` language toggle)
- TypeScript strict; no secrets in repo (`.env.local` is gitignored)
- Only commit when the user asks

## UI / design notes for AI

- Do **not** redesign UI unless asked
- Extend existing components and CSS; quick-action chips use `.portal-chatbot-quick-btn` (white pills, blue icons)
- Hero/home content changes: prefer editing source in `legacy/index-static.html` then run `npm run build` (runs `extract-home-main.mjs`) or edit `src/content/home-main.html` with UTF-8 preserved

## District map

- Canvas id `portalAboutMap`; init in `src/lib/portalAboutMap.ts`
- GeoJSON: `assets/data/odisha-districts.geojson`; property `Dist_Name` for labels
- Must be served over HTTP(S) (`npm run dev`), not `file://`

## Local development

```bash
npm install
npm run dev          # http://localhost:5173
```

Requires (for full SAKHI + status):

- .NET citizen API on **5165** (service status)
- Python AI on **8000** (`/chat`)

## Out of scope unless requested

- Angular / `HttpCallService` / `DataSharingService` (different projects)
- Committing `.env.local`, `dist/`, or `node_modules/`
- Pointing the React app directly at Ollama or Python in production without .NET gateway
