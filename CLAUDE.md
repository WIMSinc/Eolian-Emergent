# CLAUDE.md — EolianVR

Operating context for any AI assistant working in this repo. Read this before
proposing changes; several sections exist specifically to prevent well-meaning
suggestions that undo deliberate decisions.

---

## 1. Repo layout — the most common source of confusion

```
Eolian-Emergent/
├── web/          ← THE LIVE SITE. Next.js 16, App Router, JavaScript.
│   ├── app/          routes (incl. sitemap.js), page.js + *Content.jsx pairs
│   ├── components/   shared UI
│   ├── pages/api/    serverless functions, (req, res) signature
│   ├── lib/          seo.js, sanity.js, products.js, catalog.js
│   ├── data/         productCatalog.js, artakUseCases.js, supportFaqs.js
│   └── public/       hand-optimised WebP, video, robots.txt
├── studio/       ← Sanity Studio. Deployed separately, NOT part of the site build.
├── frontend/     ← DEAD. Pre-migration Create React App. Not built, not deployed.
└── backend/      ← DORMANT. FastAPI + MongoDB. Never deployed. Nothing imports it.
```

**There is no `src/` directory and no TypeScript.** Files are `.js` / `.jsx`.
Routes are `web/app/blog/page.js`, not `src/app/blog/page.tsx`. The sitemap is
`web/app/sitemap.js`, not `sitemap.ts`. robots is a static
`web/public/robots.txt`, not a `robots.ts` route.

> ⚠️ **`frontend/` is a decoy.** It is the old CRA app, retained only as a
> rollback path. Vercel builds `web/`. Editing `frontend/` changes nothing on
> the live site.

---

## 2. Canonical company facts

| | |
| --- | --- |
| Legal name | EolianVR, Inc. |
| Founded | **2016** |
| Founders | Michael McCormack, Mike Simmons |
| Address | 12577 66th St, Largo, FL 33773-3440, US |
| Phone | **(305) 562-9639** |
| Website | https://www.eolianvr.com |
| Patents | US 11,297,164 B2 · WO 2019/217437 A2 |

**The 888-811-5339 number is dead.** It appeared in four places and has been
removed; do not reintroduce it from older copy.

These values are the single source of truth. `web/lib/seo.js` emits them as
Organization schema, and the Terms, Privacy and About pages must agree with
them. A previous mismatch — schema saying founded 2017 while the About page said
2016 — is exactly the failure mode this section exists to prevent.

---

## 3. Content standards and never-claim list

> **TO BE FILLED IN BY THE EOLIAN TEAM.**
>
> This section is intentionally empty rather than guessed at. Content rules and
> claim prohibitions for a defense contractor carry real compliance weight, and
> inventing them would be worse than leaving the gap visible.
>
> Paste the content-standards and never-claim material here so there is one
> file both assistants read, rather than two that can drift.

### 3.1 Claims currently asserted on the site — NOT YET RULED ON

Inventory only. Nothing below has been approved or rejected; it is recorded so
an assistant can see what the site already says before adding more, and so the
team has one list to rule on.

**An assistant must not add a new named customer, contract value, or readiness
claim without an explicit ruling here.** Removing or softening an existing one
is equally a team decision, not a cleanup task.

Named organisations, with mention counts:

| Name | Mentions | Notes |
| --- | --- | --- |
| USSOCOM / SOCOM | 32 | Highest-exposure attribution on the site |
| Army | 20 | |
| NATO SOF | 10 | |
| DIU / Defense Innovation Unit | 9 | |
| DHS | 3 | |
| Marine Corps, Air Force | 4 | |
| USASOC, MARSOC, MITRE, ERDCWERX | 1 each | |
| "Booz Allen Hamilton and MITRE" | 1 | Stated as a **teaming partnership** |

They appear in `web/app/services/`, `web/app/about/`,
`web/app/about/past-performance/`, `web/app/about/awards/`,
`web/components/CaseStudiesSection.jsx`, `web/components/ProductSection.jsx`
and `web/data/acquireGuide.js`.

Hardware vendors named as specifications — Samsung, Skydio, Exyn, Meta Quest,
HoloLens, Magic Leap, GoTENNA, Dell — are treated as product facts rather than
customer attributions.

**Checked for and confirmed absent** (as of 2026-08-22), so do not reintroduce
them from older copy or drafts:

- No `TRL <n>` readiness claim. The only match is the proper noun "RAPTR Task
  Force — Rapid Assessment of Prototype Technology Readiness", an exercise
  name on the Past Performance page, not a readiness assertion.
- No `$13M` or comparable contract-value figure.
- No "every component of USSOCOM" or similar absolute-scope phrasing. The one
  "all components" match is `"one ARTAK Squad Kit, all components and
  services"` — kit contents, not organisational scope.

Dollar figures that do appear ($350,000 · $234,683 · $207,760 · $149,240 ·
$114,688 · $15,000) are published catalogue and acquisition-guide pricing, not
contract values.

Re-run the scan after any content change:

```bash
cd web
grep -rniE "TRL ?[0-9]|technology readiness" app components data
grep -rniE "every component|entire (DoD|force|command)" app components data
grep -rhoE "USSOCOM|NATO ?SOF|Booz Allen[ A-Za-z]*|MITRE|DIU\b" app components data | sort | uniq -c
```

---

## 4. Sanity CMS — already built and live

**Do not "add" Sanity. It is done.** Any incoming schema must be reconciled
with what exists, not used to replace it.

- Project `n2qolqrd`, dataset `production` — public ACL, anonymous published
  reads, no token in the site
- Studio: **https://eolian.sanity.studio/**, built from `studio/`
- Schema: `studio/schemas/post.js`. Includes a **`faqs` array** that drives
  FAQPage structured data — the highest-value field in the schema
- Site reads through `web/lib/sanity.js`; routes are `/blog` and `/blog/[slug]`
  with `revalidate = 3600`

`lib/sanity.js` **degrades to empty rather than throwing** when the project is
unconfigured or unreachable. eolianvr.com builds from this app, so a missing
environment variable must never fail a production deploy. Preserve that
behaviour when editing it.

---

## 5. Structured data

Eight emitters. **Use the builders in `web/lib/seo.js` — do not hand-roll
JSON-LD**, or values drift from the canonical facts above.

| Route | `@type` |
| --- | --- |
| every page (`app/layout.js`) | `Organization`, `WebSite` |
| `/artak` | `["SoftwareApplication", "Product"]` + `AggregateOffer` |
| `/products` | `ItemList` |
| `/products/[slug]` | `Product` + `Offer` (11 pages) |
| `/support` | `FAQPage` |
| `/blog` | `Blog` |
| `/blog/[slug]` | `BlogPosting` + `FAQPage` (when the post has `faqs`) |

ARTAK is **multi-typed as one entity**, not two sibling blocks. It is genuinely
both a software application and a product, but it is one thing; two blocks would
describe it as two entities competing for the same identity.

`faqSchema()` is shared by `/support` and `/blog/[slug]`. That is reuse, not
duplication — they are different URLs, and no single URL emits more than one
`FAQPage`. Verified against the built HTML; do not "fix" it.

**Known tradeoff, revisit at 3+ pages:** FAQ answers are stored inline on each
post rather than as a reusable `faq` document. With a handful of posts that is
the right call, but once the same answer appears on `/artak` and in a post, the
copies drift — and drift is precisely what answer engines penalise. Promote to
a referenced `faq` type when three or more pages share answers.

Per-SKU pricing lives on `/products/<slug>`. The `AggregateOffer` on `/artak`
derives `lowPrice` and `offerCount` from the same catalogue those pages price
against, so the two cannot drift.

---

## 6. Architecture decisions — do not reverse without discussion

Each of these was reached deliberately, several after trying the alternative.

1. **Sanity Studio stays out of `web/`.** Embedding it at `/studio` was
   implemented and reverted: pulling the `sanity` toolkit into the site's
   dependencies took the audit from **0 advisories to 9**, all `@sanity/cli`
   transitives that never execute at runtime but sit in the tree the production
   site builds from. The site is at **0 vulnerabilities**. Keep it there.
2. **`next/image` is deliberately not adopted.** Plain `<img>` against
   hand-optimised WebP in `public/`. Converting ~30 components carries real
   visual-regression risk for modest gain.
3. **Immutable-cached assets require versioned filenames.** `.webp` files and
   the hero video are served `Cache-Control: immutable, max-age=31536000`.
   Re-encoding in place strands returning visitors on the stale copy for up to a
   year. Hence `hero-bg-terrain-v2.mp4`. Bump the suffix on any re-encode.
4. **Analytics is GA4 + HubSpot only.** PostHog was removed — it was a third
   tool costing 92 KiB and 92 ms with autocapture, session recording and
   surveys all already disabled.
5. **`gtag.js` loads `lazyOnload` on purpose.** `afterInteractive` put a 159 KiB
   bundle inside the TBT window and cost ~87 ms. The small inline config still
   runs early and queues onto `dataLayer`, which gtag.js replays — no pageview
   is lost. Do not "fix" this back.
6. **`/admin` was deleted**, along with `react-quill-new`. It managed blog posts
   no route rendered and a contact list HubSpot already receives, against a
   backend that was never deployed.
7. **API routes stay in `web/pages/api/`** with the `(req, res)` signature, so
   the Stripe webhook keeps `config.api.bodyParser = false`.

---

## 7. Crawlers and indexing

`web/public/robots.txt` explicitly allows `GPTBot`, `ChatGPT-User`,
`ClaudeBot`, `Claude-Web`, `PerplexityBot`, `Google-Extended` and
`anthropic-ai`. Only `/admin` is disallowed. `CCBot` is not named and is
allowed via the wildcard — add it explicitly if that should be deliberate.

**Why server rendering matters here:** those crawlers read raw HTML and do not
execute JavaScript. The pre-migration CRA build served them 19 words; the
current build serves ~1,650. Any change that pushes content back behind
client-side rendering undoes that directly.

`next.config.mjs` sends `X-Robots-Tag: noindex, nofollow, noarchive` whenever
`VERCEL_ENV !== "production"`, so preview deployments cannot compete with the
live site for its own terms.

---

## 8. Build and deploy

- Vercel project **`eolian-emergent`**, Root Directory **`web`**, framework
  Next.js. `web/vercel.json` pins the framework and nulls the build/install/
  output overrides, because the project carried Create React App settings for
  years and an Output Directory of `build` breaks a Next build.
- **Rollback** is a single change: Root Directory `web` → `frontend`, redeploy.
  `frontend/vercel.json` pins its own framework so nothing else is needed.
- Environment variables live only in Vercel. `web/.env.example` documents every
  one. `PUBLIC_SITE_URL` and `STRIPE_WEBHOOK_SECRET` differ between production
  and any preview — see that file.
- `NEXT_PUBLIC_*` values are baked in **at build time**. Adding one requires a
  redeploy that starts *after* the variable is saved.

---

## 9. Current state

- `main` and `claude/nextjs-migration-phase1` are identical
- Dependency audit: **0 vulnerabilities** in `web/`
- PageSpeed: mobile **75**, desktop **91** (lab variance is ±5; judge trends)
- Open: first blog post, `backend/` removal, YouTube facade pattern

## 10. Working conventions

- Pages needing interactivity use a two-file split: `page.js` (server, exports
  `metadata`) wrapping `*Content.jsx` (`"use client"`). `metadata` cannot be
  exported from a client module. Client components are still server-rendered
  into the initial HTML, so this costs nothing in crawlability.
- Verify before claiming. Build output, rendered HTML and live endpoints are
  the evidence — not intent.
- `web/README.md` and `studio/README.md` carry fuller reasoning for the
  decisions summarised here.
