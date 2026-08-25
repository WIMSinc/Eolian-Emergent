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
| Leadership | **Michael** McCormack (CEO), **Mike** Simmons (COO) — different first-name forms, both correct as written |
| Address | 12577 66th St, Largo, FL 33773-3440, US |
| Phone | **(305) 562-9639** |
| Website | https://www.eolianvr.com |
| CAGE / UEI | 7RLL6 · HHN2E2LNBSV5 |
| NAICS | 541511 (primary); 541512, 541519, 423420, 423430, 423490, 541613, 611430 |
| Patents | US 11,297,164 B2 · WO 2019/217437 A2, enforceable through ~2040 |
| Products | **ARTAK** (flagship), **Map Maker**, **STAK** |
| DoD funding to date | **$18M** (includes the $5M FY26 congressional add) |
| ARTAK Squad Kit | **$234,683** |

**Eligibility:** Other Small Business, 100% U.S.-owned, **nontraditional defense
contractor** (10 U.S.C. § 3014 — the basis for OTA prototype awards without cost
share). **NOT** SDVOSB, 8(a), WOSB or HUBZone; never claim set-aside eligibility
beyond Small Business.

Use the address identically on the site, SAM.gov, the capability statement,
LinkedIn and Google Business Profile — variants split the entity graph.

**The 888-811-5339 number is dead.** It appeared in four places and has been
removed; do not reintroduce it from older copy.

These values are the single source of truth. `web/lib/seo.js` emits them as
Organization schema, and the Terms, Privacy and About pages must agree with
them. A previous mismatch — schema saying founded 2017 while the About page said
2016 — is exactly the failure mode this section exists to prevent.

---

## 3. Content standards and never-claim list

Reconciled from the Eolian working-style guide on 2026-08-24. Where that guide
and this file ever disagree, **this file wins** — and the guide gets reconciled
in the same session.

### Never claim

None of these exist. Publishing any of them is a compliance problem, not a
wording problem.

- FedRAMP High / IL5 / IL6 **authorization** — **"IL-5 path in progress"** is
  the correct phrasing
- An independent or transferable ATO
- JITC, NIAP or Common Criteria certification
- A published VPAT or Section 508 conformance
- CAC/PIV federation
- A native browser-only client

### Withheld from public copy

- **U.S. Coast Guard is NOT a customer.** Older capability-statement material
  lists it; that material is wrong. Never reintroduce it.
- **Any TRL claim, including TRL 9** — internally debated, not confirmed.
- **"every component of USSOCOM"** — the accurate scope is **"most
  components."**
- **Unapproved third parties:** UK MoD, Australian Army, American Rheinmetall,
  PNNL, USMA West Point, Montana State. Rheinmetall and Microsoft Federal are
  real relationships but are not cleared for public naming.
- **Headcount, revenue, capital raised, fundraising status, pipeline values.**
  "Small business" is the approved framing.
- **Specific unit designations** (ODA numbers, battalion identifiers) in *new*
  copy. Existing site case studies naming units were approved separately.

If a figure cannot be traced to a source, mark it `[VERIFY]` rather than
shipping it. Never invent contract values, program office names or solicitation
numbers.

### AEO rules — these outrank styling

Answer-engine crawlers (GPTBot, ClaudeBot, PerplexityBot) **do not execute
JavaScript**.

- **Never add `"use client"` to a blog route.**
- **Never hide FAQ answers behind a JS-only accordion.** Collapse with CSS or an
  animated height on an always-mounted element; conditional rendering keeps the
  text out of the HTML entirely. `/support` had exactly this bug — answers
  existed only inside the JSON-LD until it was fixed.
- **Acceptance test for any content change:** `curl -s <url> | grep` for the
  text. If it is not in the raw HTML, it does not exist for AEO.

### FAQ answer style

- Repeat the subject noun instead of pronouns — "ARTAK is…", never "It is…" —
  so an extracted snippet survives without its surrounding context.
- 40–120 words. Answer in the first sentence.
- Phrase questions the way a person would actually type them.

### 3.1 Claims currently asserted on the site — APPROVED as of 2026-08-22

Everything listed below was reviewed and **approved for public attribution** by
the Eolian team. Leave it as it stands.

Two rules follow from that, and they cut in both directions:

- **Do not remove, soften or reword these attributions** as a tidy-up. They are
  deliberate.
- **Approval covers this list, not the category.** A *new* named customer,
  contract value or readiness claim still needs an explicit ruling before it
  goes on the site, and should be added here once granted.

Named organisations, with mention counts at time of approval:

| Name | Mentions | Notes |
| --- | --- | --- |
| USSOCOM / SOCOM | 32 | Approved |
| Army | 20 | |
| NATO SOF | 10 | |
| DIU / Defense Innovation Unit | 9 | |
| DHS | 3 | |
| Marine Corps, Air Force | 4 | |
| USASOC, MARSOC, MITRE, ERDCWERX | 1 each | |
| "Booz Allen Hamilton and MITRE" | 1 | Approved — stated as a teaming partnership |

They appear in `web/app/services/`, `web/app/about/`,
`web/app/about/past-performance/`, `web/app/about/awards/`,
`web/components/CaseStudiesSection.jsx`, `web/components/ProductSection.jsx`
and `web/data/acquireGuide.js`.

Hardware vendors named as specifications — Samsung, Skydio, Exyn, Meta Quest,
HoloLens, Magic Leap, GoTENNA, Dell — are product facts rather than customer
attributions, and are likewise approved.

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

- Project **`b4qwtn71`**, dataset `production` — public ACL, anonymous published
  reads, no token in the site
- Studio: built from `studio/`, deployed with `npm run deploy`. The old
  **eolian.sanity.studio** host belonged to the previous project and is gone
- Schema: `studio/schemas/post.js`. Includes a **`faqs` array** that drives
  FAQPage structured data — the highest-value field in the schema
- Site reads through `web/lib/sanity.js`; routes are `/blog` and `/blog/[slug]`
  with `revalidate = 3600`
- Content source of truth is **`content/blog-posts.ndjson`**, committed. Import
  it with `sanity dataset import ... --replace`; export after publishing

**Project `n2qolqrd` was deleted on 2026-08-25 — do not reference it.** It was
billed through the Vercel Marketplace, and such a project is deleted by
removing the resource in Vercel rather than through Sanity's Manage UI, so the
deletion happened with no confirmation on the Sanity side and took the dataset
with it. The published posts were rebuilt from the rendered HTML of the live
pages; a third post existed only as a draft, and because drafts never render,
nothing had a copy of it. Treat the CMS as replaceable and the committed
NDJSON as the real source. Prefer **Archive** over **Delete** on any project
worth keeping — archiving is reversible.

Neither the site nor the Studio hardcodes the project: `SANITY_STUDIO_PROJECT_ID`
in `studio/.env`, `NEXT_PUBLIC_SANITY_PROJECT_ID` in Vercel. They must agree, and
the dataset ACL must stay public, or the blog renders empty with nothing in the
build log to explain it.

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
- Blog is live with two posts — `/blog/what-is-artak` and `/blog/who-is-eolianvr`
  (25 inline FAQs between them). Verified in the raw HTML, not just in Sanity.
- Open: cover images for both posts (uploaded in Studio, not the filesystem),
  `backend/` removal, YouTube facade pattern

**Publishing content is not a deploy — but it races one.** Content imported into
Sanity while a build is running will be missing from anything rendered at build
time. On 2026-08-24 an import committed at 19:13:50Z against a build that went
READY at 19:13:57Z: the two post pages were fine (generated on demand afterwards,
so they picked the content up), but `/blog` served "No posts published yet" and
`/sitemap.xml` carried 36 URLs and no post URLs. Both read from `getAllPosts()`
at build time. Nothing was wrong with the content or the code — the fix is a
redeploy. After importing or publishing, re-check `/blog` **and** `/sitemap.xml`,
not just the post URL.

## 10. Working conventions

- Pages needing interactivity use a two-file split: `page.js` (server, exports
  `metadata`) wrapping `*Content.jsx` (`"use client"`). `metadata` cannot be
  exported from a client module. Client components are still server-rendered
  into the initial HTML, so this costs nothing in crawlability.
- Verify before claiming. Build output, rendered HTML and live endpoints are
  the evidence — not intent.
- `web/README.md` and `studio/README.md` carry fuller reasoning for the
  decisions summarised here.
