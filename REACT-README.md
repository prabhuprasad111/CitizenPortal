# Citizen Portal — React + Vite + TypeScript

The site is now a **React 18** app built with **Vite** and **TypeScript**. The original design and CSS are preserved.

## Run locally

```bash
npm install
npm run dev
```

Open **http://localhost:5173**

## Routes

| URL | Page |
|-----|------|
| `/` | Home (all sections) |
| `/login` | Login / registration |
| `/photo-gallery` | Photo gallery with filters |

## Project layout

- `src/` — React app (components, hooks, pages)
- `src/content/` — HTML extracted from legacy pages (regenerated on `npm run dev` / `npm run build`)
- `legacy/index-static.html` — original static homepage (source for home content)
- `assets/` — images, CSS, GeoJSON (served via `public/assets` symlink)
- `login.html`, `photo-gallery.html` — legacy static files (reference only)

## Build for production

```bash
npm run build
npm run preview
```

Output is in `dist/`.

## Editing content

1. **Home sections:** edit `legacy/index-static.html`, then run `npm run dev` (or `node scripts/extract-home-main.mjs`).
2. **Login:** edit `login.html`, then run `node scripts/extract-login-main.mjs`.
3. **Styles:** still in `assets/css/main.css`, `assets/css/login.css`, etc.

## Tech stack

- React Router, Bootstrap 5, Swiper, AOS, GLightbox, Isotope, ECharts, ApexCharts
- Portal features: Odisha map, hero charts, SATHI chatbot, EN/ODIA language toggle
