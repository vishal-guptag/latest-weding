# #ShruVi — Vishal ❤️ Shruti · Wedding Invitation

Scroll-driven "Modern Royal Cinema" invitation. React + TypeScript + Vite + Tailwind v4 + Motion. Shared via WhatsApp, built for phones.

## Quick start
```bash
nvm use            # Node 22 (.nvmrc)
npm ci
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
npm run preview    # production build on http://127.0.0.1:4173
npm test           # unit tests (Vitest)
npm run e2e        # Playwright (needs a browser: `npx playwright install`)
```

## Editing content
Everything lives in `src/data/weddingDetails.ts`: names, events (ISO date + 24h time), venue, family lists, phones, Hindi message, `updates`, `gallery`.
Events drive the schedule UI, the `.ics`, Google Calendar links and share text, so they cannot disagree.

- **Updates banner:** set `updates: 'Parking is available at …'`. Empty = hidden.
- **Gallery:** add photos to `public/images/` and list them in `gallery` (`src`, `alt`, `width`, `height`). While empty, the section and its nav link are omitted.
- **Music:** drop one `.mp3/.m4a/.aac` (under ~3 MB, licensed/royalty-free) into `public/music/` and rebuild. No file = no music button and no network request.
- **Site URL:** set `VITE_SITE_URL` in `.env` (also used for canonical + Open Graph tags). Change it to your real Netlify URL before sharing.

## Assets you need to supply
| Asset | Where | Recommended |
|---|---|---|
| Couple / roka / engagement photos (optional) | `public/images/` + `gallery` | AVIF/WebP, ≤1600 px wide, ≤250 KB each |
| Venue photograph (optional) | not wired yet: venue uses ornamental arch | WebP, 1200×800 |
| Instrumental music (optional) | `public/music/` | MP3/AAC, < 3 MB, licensed |
| Final share image | replace `public/og-image.jpg` | 1200×630 JPG, < 300 KB (current one is a typographic placeholder card) |
| `apple-touch-icon.png` (optional) | `public/` | 180×180 PNG |

## Deploy (GitHub → Netlify)
```bash
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```
Netlify → Add new site → Import from Git → pick the repo. Build `npm run build`, publish `dist` (already in `netlify.toml`). Pushes to `main` auto-deploy; PRs get deploy previews. After the first deploy, set `VITE_SITE_URL` in Netlify env vars to the live URL and redeploy.
The site is `noindex` + `robots.txt` Disallow (private invitation). Remove both to allow search indexing.

## Chosen versions (verified with `npm view` on 2026-11-10)
Node 22 · Vite 8.3.7 · React/React-DOM 19.3.1 · **TypeScript 6.0.3** · Tailwind 4.3.5 (`@tailwindcss/vite`) · Motion 14.12.0 · lucide-react 1.71.0 · Vitest 5.1.0 · Playwright 1.65.0 · ESLint 10.14.0 + typescript-eslint 8.72.2 · qrcode 1.5.4.
- TypeScript 7.0.2 is "latest" but typescript-eslint declares `typescript <6.1.0`, so I pinned 6.0.3 for a compatible toolchain.
- **Lenis: left out.** Native scroll is smoother on phones and keeps the pinned scenes simple. **GSAP: left out.** Motion + CSS `sticky` handled the pinned horizontal journey.

## Design decisions
- **Palette:** wine/plum grounded chapters alternating with ivory paper chapters; antique gold foil with a pearl/opalescent glint used only inside gold gradients; saffron only on the Baan/Ghurchari tints.
- **Type:** Cormorant Garamond (display), Pinyon Script (accents), Noto Serif Devanagari (Hindi); body is the system sans stack, keeping to 3 loaded families.
- **Ornament:** all inline SVG (Ganesh line-art, mandala, jharokha arch, one consistent line-art set for the six events).
- **Glass:** only on the nav bar and cards, small blur, solid fallback via `@supports`.
- **Motion:** CSS scroll-driven animations for progress/reveals (with `@supports` and static fallback), Motion for envelope / kinetic names / pinned journey, one scoped canvas for petals (30 desktop / 14 mobile, paused off-screen), View Transitions for share sheet + lightbox (feature-detected). `prefers-reduced-motion` disables parallax, particles, kinetic type and 3D.
- **Deliberate deviations from the brief:** (1) monogram-to-nav is a scroll-scrubbed shrink + nav fade-in, not a View Transition; (2) QR is generated client-side in a lazy chunk, not at build time; (3) Google Fonts are loaded from the CDN and not preloaded. Self-host the display font to preload it.

## Test report (run 2026-11-10, Chromium via system Chrome)
| Check | Result |
|---|---|
| `npm ci` (clean copy) | PASSED |
| TypeScript type-check | PASSED |
| ESLint | PASSED (after fixing a real ICS `;` escaping bug it caught) |
| Unit tests (12) | PASSED |
| `npm run build` | PASSED — JS 365 kB (119 kB gzip), CSS 33 kB (7.4 kB gzip); lazy chunks: qrcode 23 kB, share sheet 2.9 kB, gallery 1.4 kB, lightbox 1.5 kB |
| Production preview | PASSED |
| Playwright Chromium (19 tests: 4 viewports, envelope, nav, 6 events, journey keyboard control, venue URLs, WhatsApp, copy link, .ics, Hindi/family/no-10-Dec audit, reduced motion, progressive enhancement, glass fallback) | PASSED |
| Playwright **WebKit / Firefox** | UNVERIFIED (browser downloads blocked in this environment) |
| Pinned journey via mouse wheel / touch swipe | UNVERIFIED (only keyboard/buttons tested) |
| No horizontal scroll at 375/768/1366/1920 | PASSED |
| Console errors / failed requests | PASSED, except Google Fonts requests, which the sandbox blocks (so webfont rendering is UNVERIFIED) |
| axe (WCAG 2.0/2.1/2.2 A+AA) | PASSED — 0 serious/critical (fixed one `aria-label` issue); manual keyboard pass limited to the automated tests |
| Lighthouse mobile (default throttling) | Perf 93 · A11y 100 · Best Practices 96 · SEO 66 (intentional `noindex`) · LCP 1.4 s · CLS 0 · TBT 330 ms |
| Music start / fallback | UNVERIFIED — no audio file supplied; code path only |
| Real WhatsApp preview, iOS audio, live Netlify deploy | UNVERIFIED until deployed |
