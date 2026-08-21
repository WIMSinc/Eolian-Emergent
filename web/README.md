# EolianVR — Next.js migration (Phase 1)

Server-rendered rebuild of the marketing site, living alongside the existing CRA
app in `frontend/` so nothing in production is disturbed while the port proceeds.

**This app is not wired to a deployment yet.** `frontend/` still serves
eolianvr.com. Promoting this one is a deliberate, separate step (see below).

## Why

The CRA build ships an empty `<div id="root">` and paints only after a ~137 KB
bundle boots. Two consequences:

- Mobile Performance is capped around 61 on a throttled device.
- AI crawlers (GPTBot, ClaudeBot, PerplexityBot) read raw HTML and do not run
  JavaScript, so they see essentially nothing — despite robots.txt inviting them.

Measured against the same home page:

| | raw-HTML words | advisories |
| --- | --- | --- |
| `frontend/` (CRA) | 19 | 32 |
| `web/` (Next) | **1,653** | **0** |

## Phase 2 additions

- All 10 remaining marketing routes ported (About tree, ARTAK national-security,
  Lab, Support, Team, Terms, Privacy). `/terms` and `/privacy` needed no client
  boundary at all and are pure server components.
- `/artak/[slug]` — the eight use-case pages, prerendered via
  `generateStaticParams()` with per-slug `generateMetadata()`. Their copy moved
  to `data/artakUseCases.js` so the server route and the client component share
  one source; unknown slugs still redirect to `/artak` as the CRA build did.
- `/checkout/success` and `/checkout/cancelled` read `session_id` from
  server-side `searchParams`, which keeps them server components and avoids
  needing a Suspense boundary for `useSearchParams()`.
- `app/sitemap.js` replaces the hand-maintained `public/sitemap.xml`. The ARTAK
  URLs derive from the same `slugs` the routes use, so the drift that left
  `/acquire` missing cannot recur there.

**Route parity: every public CRA route now exists here.** Only `/admin` and
`/admin/dashboard` remain, deferred to Phase 3 with the auth rework.

## What Phase 1 covers

- App Router scaffold, Tailwind config and global CSS ported verbatim
- Root layout replacing `public/index.html` + `App.js`: fonts, GA4, HubSpot,
  PostHog (via `next/script`), Vercel Analytics, reCAPTCHA provider, and
  Organization + WebSite JSON-LD rendered **server-side**
- Metadata API replaces `react-helmet` — `lib/seo.js` holds the shared constants,
  schema builders, and a `pageMetadata()` helper mirroring the old SEO props
- 5 routes, all statically prerendered: `/`, `/artak`, `/acquire`, `/services`,
  `/mapmaker`
- All 6 API routes under `pages/api/` — unchanged `(req, res)` handlers, so the
  Stripe webhook keeps its `config.api.bodyParser = false`
- 18 components ported: `react-router` → `next/link` + `usePathname`, with
  `"use client"` boundaries where hooks/framer-motion/browser APIs are used

`lib/seo.js` also adds `productSchema()` and `faqSchema()` — unused so far, they
are what Phase 3 needs for Merchant Center and answer-engine coverage.

## Layout convention

Pages that need client-side interactivity use a two-file split:

```
app/services/page.js           server component — exports `metadata`
app/services/ServicesContent.jsx   "use client" — the actual UI
```

`metadata` cannot be exported from a `"use client"` module, hence the wrapper.
Note that client components are still server-rendered into the initial HTML, so
this split costs nothing in crawlability.

## Phase 3 additions

- `/admin` and `/admin/dashboard` ported. Auth turned out to be `sessionStorage`
  against the separate FastAPI backend and entirely client-side, so no SSR
  rework was needed — only `useNavigate` → `useRouter` and the env-var rename
  below. Quill loads through `next/dynamic` with `ssr: false` because it touches
  `document` at import time.
- **`/products` and `/products/[slug]`** — 11 prerendered product pages, one per
  SKU, each emitting `Product`/`Offer` JSON-LD. This is the Merchant Center
  unblock: previously no product had a URL of its own. The index emits
  `ItemList` so the whole catalogue is reachable from one page.
- `FAQPage` JSON-LD on `/support`, built from the same five knowledge-base
  entries the page renders (extracted to `data/supportFaqs.js` so copy is not
  duplicated).
- `next/font` self-hosts Inter, IBM Plex Sans, JetBrains Mono and Unbounded.
  The render-blocking `fonts.googleapis.com` stylesheet is gone; 8 woff2 files
  are preloaded from the same origin instead.
- Product URLs added to the generated sitemap — now 35 URLs.

### Env var rename

CRA's `REACT_APP_*` convention does not exist in Next. The admin pages now read
`NEXT_PUBLIC_BACKEND_URL` (was `REACT_APP_BACKEND_URL`). **This must be set in
Vercel before the admin routes will work.** No other client code reads env vars;
the API routes' server-side vars are unchanged.

## Known issues

- `react-quill-new` carries a low-severity XSS advisory via `quill`, fixable
  only by a major bump. It is the app's only outstanding advisory (2 low, 0
  moderate/high/critical) and is reachable solely from the authenticated,
  noindex admin editor. Same exposure the CRA build had.
- `next/image` is **not** adopted. Images are still plain `<img>` pointing at the
  hand-optimised WebP files in `public/`. Converting ~30 components carries real
  visual-regression risk for modest gain, so it was deliberately deferred rather
  than rushed.
- `News`/`NewsPost` page components exist in the CRA tree but were never routed
  in `App.js`, so they were intentionally skipped.

## Running it

```bash
cd web
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Promoting to production (do not do this casually)

Vercel builds from `frontend/`. Switching over means repointing the project root
to `web/`, moving env vars (`STRIPE_*`, `SMTP_*`, `NOTIFY_EMAIL`), and confirming
the Stripe webhook endpoint still resolves. Do it only once the remaining routes
are ported — otherwise live URLs 404.
