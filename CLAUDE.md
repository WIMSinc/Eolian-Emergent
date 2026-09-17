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
| Leadership source of truth | **`web/data/team.js`** — `/team`, the author pages and the `Person` JSON-LD all read from it |
| Address | 12577 66th St, Largo, FL 33773-3440, US |
| Phone | **(305) 562-9639** |
| Website | https://www.eolianvr.com |
| CAGE / UEI | 7RLL6 · HHN2E2LNBSV5 |
| NAICS | 541511 (primary); 541512, 541519, 423420, 423430, 423490, 541613, 611430 |
| Patents | US 11,297,164 B2 · WO 2019/217437 A2, enforceable through ~2040 |
| Products | **ARTAK** (flagship), **Map Maker**, **STAK** |
| ARTAK expands to | **Augmented Reality Team Awareness Kit** — *never* "Tactical Assault Kit" |
| DoD funding to date | **$18M** (includes the $5M FY26 congressional add) — **approved for site copy 2026-09-12**, first used on `/team/mike-simmons` |
| ARTAK Squad Kit | **$234,683** |

**Eligibility:** Other Small Business, 100% U.S.-owned, **nontraditional defense
contractor** (10 U.S.C. § 3014 — the basis for OTA prototype awards without cost
share). **NOT** SDVOSB, 8(a), WOSB or HUBZone; never claim set-aside eligibility
beyond Small Business.

Use the address identically on the site, SAM.gov, the capability statement,
LinkedIn and Google Business Profile — variants split the entity graph.

**The 888-811-5339 number is dead.** It appeared in four places and has been
removed; do not reintroduce it from older copy.

**ARTAK is the Augmented Reality Team *Awareness* Kit** — the current and
accurate expansion, and the only one this site uses. Older material expands it
as "Augmented Reality Tactical Assault Kit"; that rename is **deliberately
still in progress** across external material, so leaving the old form in some
places for now is a known state and not a defect to go fixing. What matters
here: **new copy uses Awareness**, and nothing on this site has ever used
Assault (the one "Tactical Assault" match in the repo is the TALOS program
name — Tactical Assault Light Operator Suit — which is a correct proper noun).

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
- **Unapproved third parties: Australian Army and Microsoft Federal.** Real
  relationships, still not cleared for public naming.
  **Cleared 2026-09-12** and moved to the §3.1 approved list: UK Ministry of
  Defence, American Rheinmetall, PNNL, USMA West Point, Montana State. They
  were already live on `/about/past-performance`; the ruling confirms they
  belong there rather than that the page was wrong. Australian Army and
  Microsoft Federal were **not** part of that ruling — do not infer them from
  it.
- **Headcount, revenue, capital raised, fundraising status, pipeline values.**
  "Small business" is the approved framing.
- **Specific unit designations** (ODA numbers, battalion identifiers) in *new*
  copy. Existing site case studies naming units were approved separately.

If a figure cannot be traced to a source, mark it `[VERIFY]` rather than
shipping it. Never invent contract values, program office names or solicitation
numbers.

**ARTAK Block 3 phrasing, settled 2026-09-11.** Two traps in the launch copy:

- **"Built to MIL-STD-2525E"**, never "complete adherence" or "fully
  conformant". A blanket conformance claim is something a customer can test,
  and 2525E has been superseded by **2525E w/ Change 1 (2 March 2025)** — so an
  unqualified claim invites the question of which version. If engineering ever
  confirms full conformance, name the version explicitly and update this line.
- **Name no specific weapon system.** The Weapon Inventory is described by
  count and by what it enforces ("200+ U.S. weapon systems", "cannot be placed
  beyond its actual range"), never by system. Whether the range, kill-zone and
  blast-radius figures derive from publicly releasable sources is unconfirmed,
  so the copy stays at the level where that does not matter.

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
- **Repeated cards are lists — mark them up as `<ul>`/`<li>`.** Every card grid
  was `<div>` soup, so a crawler reading raw HTML could not tell a ten-item
  capability grid from a paragraph. Tailwind's preflight already zeroes
  `list-style`, `margin` and `padding` on `ul`/`ol`, so `div` → `ul` and
  `motion.div` → `motion.li` is a **visual no-op**; there is no reason to leave
  a repeated `.map()` as divs. `/products` and `/blog` are the deliberate
  exceptions: their repeated child is a `<Link>` rather than a `motion.div`, so
  wrapping costs a grid-item stretch fix, and both already emit `ItemList` /
  `Blog` JSON-LD covering the same ground.
- **Exactly one `<h1>` per route, and no skipped levels.** Audited across all
  19 routes on 2026-09-11; `/about/awards` was the only defect (h1 → h3) and is
  fixed. Re-run the audit after adding a route.

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
| UK Ministry of Defence, American Rheinmetall, PNNL, USMA West Point, Montana State | 1 each | **Approved 2026-09-12.** Listed in `additionalCustomers` on `/about/past-performance`; fine to name publicly anywhere |

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

**Granted 2026-09-12 — third-party press may be cited by its real headline,
and $18M may appear in site copy.** Three rulings from that session:

- **$18M DoD funding to date is approved for site copy**, including the $5M
  FY26 congressional appropriation. It is live on `/team/mike-simmons` and
  nowhere else yet; the rest of the site may adopt it.
- **The $9.9M ClearanceJobs headline is the APFIT Production OTA with USSOCOM
  S&T** that `/about/awards` and `/about/past-performance` already describe —
  not a separate contract, and not a new claim. It is cited as a headline; a
  cited headline is still **not** a licence to restate the figure in our own
  prose.
- **"Navy SEALs" in the Last Week In D.C. episode title is the publisher's
  headline grab.** Those units are one part of USSOCOM among many. Quote the
  title; never paraphrase it into our own copy. **"Most components of USSOCOM"
  remains the phrasing wherever the site speaks for itself.**

**Author-page naming is deliberately narrower than this approved list.**
`/team/mike-simmons` names only USSOCOM and DIU on the government side, plus
Mayo Clinic and Atrium Health. Army, Marine Corps, Air Force, NATO SOF, DHS and
the Booz Allen / MITRE teaming are approved and published elsewhere but were
dropped from that page by request — do not add them back as a completeness fix.

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
- Studio: **https://eolian.sanity.studio/**, built from `studio/`, deployed with
  `npm run deploy`. The hostname is the same as before, but the application
  behind it is new (`stx1x12dctuosp6merrpebmt`) — the old one died with the old
  project, and `eolian` was free to reclaim
- Schema: `studio/schemas/post.js`. Includes a **`faqs` array** that drives
  FAQPage structured data — the highest-value field in the schema
- Site reads through `web/lib/sanity.js`; routes are `/blog` and `/blog/[slug]`
  with `revalidate = 3600`
- Content source of truth is **`content/blog-posts.ndjson`**, committed. Import
  it with `sanity dataset import ... --replace`; export after publishing
- **Studio needs Node >= 22.12.** `sanity@6` declares that floor; `sanity@5`
  also ran on Node 20. A Codespace on the default image gets Node 20, `npm
  install` refuses `sanity@6` on it, and the workaround taken on 2026-08-25 was
  to downgrade `studio/package.json` to `^5.14.1` **in the Codespace only** —
  never committed. So the live Studio was deployed from v5 while the repo said
  v6, and that v6 pin had never been built. `studio/package.json` now declares
  `engines.node`, `studio/.nvmrc` pins 22.12, and `studio/package-lock.json` is
  committed so the tree resolves identically every time. **If a Studio deploy
  fails on install, check `node -v` first** — that is the whole bug.

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
| `/acquire` | `HowTo` × 3 |
| `/team/[slug]` | `Person` |
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

`/acquire` emits **three** `HowTo` entities, not one, because it genuinely
documents three procedures for three readers — the unit's six steps, the
contracting shop's eleven, and the KO Fast Start's five. `howToSchema()` reads
them straight out of `data/acquireGuide.js`, so the schema cannot describe a
procedure the page does not render, and a section whose steps go missing drops
out rather than publishing an empty `HowTo`. Note that Google retired HowTo
*rich results* in 2023: this earns no search card and is not meant to. It is
there so an answer engine extracting "how does a unit buy ARTAK" gets ordered
steps instead of inferring them from prose.

**Authors are one entity, referenced by `@id`.** `personId(slug)` returns
`https://www.eolianvr.com/team/<slug>#person`. The full `Person` — job title,
bio, `knowsAbout`, `sameAs` — is emitted **once**, on the author page.
`BlogPosting.author` and `Organization.founder` both reference that same `@id`
rather than restating it. Without the shared `@id` those are three unconnected
people who happen to share a name, and the credentials on the author page
attach to none of the bylines — which would defeat the entire point of
bylining. Do not inline a second copy of the Person anywhere.

**`personSchema()` omits every optional key when empty rather than emitting
`[]` or `""`.** An empty `sameAs` asserts "this person has no findable
profiles", which is false and worse than silence; the same applies to `image`
and `subjectOf`. Never guess a profile URL — a `sameAs` pointing at the wrong
person is worse than an absent one.

`author.elsewhere` splits by `kind`, and the split is a correctness rule, not a
display choice. `"interview"` means the work is *about* the person, which is
exactly what `subjectOf` asserts. `"writing"` means they authored something
hosted elsewhere — rendered as a link, but claiming **no** schema property,
because schema.org has none that says that accurately and a stretched one
would assert something untrue.

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
   site builds from. Measured 2026-09-17 with lockfiles in place: the `studio/`
   tree carries **14 advisories** (12 moderate, 2 high) against **3** in `web/`,
   and nothing under `web/` imports from `studio/`. That gap is the decision
   working exactly as intended — Studio advisories never reach the tree the
   live site builds from. Keep it there.
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
8. **Form submissions reach HubSpot from the server, not the browser.** All
   three forms — contact, catalog request, kit quote — email a notification and
   also POST to the HubSpot Forms API via `web/lib/hubspot.js`. Previously the
   only thing creating CRM records was Collected Forms, a client script that
   scrapes the DOM, so an ad blocker or a managed corporate laptop meant the
   email arrived and HubSpot got nothing. HubSpot's own numbers showed it: the
   previous site's form collected 294 submissions, the current site's three
   selectors collected four between them. A server-side POST cannot be blocked.
9. **HubSpot loads on first interaction, or after five seconds.** See
   `web/components/HubSpotLoader.jsx`. `lazyOnload` was not enough — hs-scripts
   is a loader that chain-pulls ~100 KiB costing 1,130 ms of long tasks, which
   was essentially the entire 1,070 ms mobile TBT.

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
  and any preview — see that file. (`.gitignore` excluded `.env.*`, which is
  why that file did not exist for a while despite this line describing it; the
  example files are now explicitly un-ignored.)
- **A HubSpot form must not mark Last name required.** The site collects a
  single "Name" field, mapped to `firstname`. A required `lastname` makes
  HubSpot reject the whole submission, and the failure is invisible from the
  outside: the notification email still arrives, only the CRM record is
  missing. That was the live configuration when the integration went in, so it
  is worth checking on any new form.
- **A HubSpot form must not have Captcha / SPAM prevention enabled.** HubSpot
  refuses API submissions outright for such a form:
  `FORM_HAS_RECAPTCHA_ENABLED — Form can't receive API submissions as Captcha
  (SPAM prevention) is enabled.` It fails the same silent way as the required
  `lastname`: email arrives, CRM record does not. The setting is redundant here
  anyway — every form route verifies reCAPTCHA server-side and checks a
  honeypot *before* forwarding, so anything reaching HubSpot has already
  cleared spam checks the site controls.
- Both of the above fail invisibly, so **check Vercel runtime errors rather
  than trusting a successful-looking submission.** The routes log HubSpot's
  rejection verbatim, and it names the cause directly.
- `NEXT_PUBLIC_*` values are baked in **at build time**. Adding one requires a
  redeploy that starts *after* the variable is saved.

---

## 9. Current state

- `main` and `claude/nextjs-migration-phase1` are identical
- Dependency audit: **0 vulnerabilities in `web/`** as of 2026-09-17, after
  patching `next` 16.3.2 → **16.3.5** (critical: unauthenticated RCE in Image
  Optimization), `nodemailer` 9.0.5 → **10.0.10** (high), and the transitive
  `fast-uri` 3.1.5 → **3.1.8** (high). None of the three needed the risky
  change they looked like: `next` was a patch inside 16.3.x, `fast-uri` had a
  fix inside the 3.x line that still satisfies `ajv`'s `^3.0.1`, and
  **nodemailer 10 keeps a CommonJS entry point**, so `pages/api/` kept working
  unchanged (§6.7). Watch that last one on any future nodemailer bump — its
  `package.json` is `"type": "module"` and only the `exports.require` mapping
  keeps `require("nodemailer")` alive.
- The `studio/` tree still carries **14 advisories** and that is fine — see
  §6.1. It is deployed separately and nothing in `web/` imports from it.
- PageSpeed: mobile **75**, desktop **91** (lab variance is ±5; judge trends)
- Blog is live with three posts — `/blog/what-is-artak`, `/blog/who-is-eolianvr`
  and `/blog/artak-block-3-whats-new` (33 inline FAQs between them). Verified in
  the raw HTML, not just in Sanity.
- **ARTAK Block 3 is the current release.** `components/FeaturesSection.jsx`
  leads with the Block 3 grid and keeps the Block 2 grid below it — each Block
  is additive, so the page must not read as a swap. That component, the Block 3
  post, and `softwareApplicationSchema()` in `lib/seo.js` (`softwareVersion:
  "Block 3"`, `releaseNotes` pointing at the post) are one set of claims; change
  one and reconcile the other two. `/support` still links the **Block 2 Full
  User Manual** (`[DOC.02]`, v2.4.1) because no Block 3 manual URL exists yet —
  do not invent one.
- **`components/OfferBanner.jsx` is a time-limited promotion that expires
  itself** — free Meta Quest 3 with a Block 3 bundle, through 30 September
  2026. It renders `null` past `OFFER_ENDS`, so the worst case is one stale
  hour rather than a dead promotion sitting on the home page for a quarter.
  **That only works because `/` and `/artak` export `revalidate = 3600`.** A
  fully static page evaluates the date once at build time and freezes the
  answer, so never remove those exports while the banner is live. Its prices
  ($3,400 / $6,800) are the `ARTAK User License` and `ARTAK User License x 2`
  rows in `data/productCatalog.js` — change one and reconcile the other.
  It is a server component on purpose: `/artak` passes it into the client
  `ArtakContent` as the `offerBanner` prop rather than importing it there, so
  the expiry date is never evaluated in a visitor's browser.
- **Posts are bylined to a person, not the company.** `data/team.js` holds the
  author profiles; the Sanity `author` field stores a slug key, not a
  reference, because the credentials belong next to `/team` in the repo rather
  than in the CMS. An absent or unknown key falls back to
  `DEFAULT_AUTHOR_SLUG`, so a post imported without an author still carries a
  byline. All three live posts are set to `mike-simmons`.
- **`content/blog-posts.ndjson` had drifted badly and is now back in sync.** It
  was missing the Block 3 post entirely, and both older posts were missing
  their `coverImage` and all 21 `tags` each — everything added in Studio after
  the last export. Since §4 names this file as the real source of truth
  precisely because the CMS was lost once, that drift was a broken recovery
  path. Verified field by field against the live dataset: block counts, body
  character counts, title and excerpt lengths, tag counts and cover asset refs
  all match. **Re-export after publishing** — and note that the failure is
  silent, because a stale export still imports cleanly.
- **All three posts have cover images with alt text.** An earlier note here
  said two were missing; that was read off the committed NDJSON, which was
  stale, rather than off Sanity. **Check the dataset, not the export.**
- Open: `backend/` removal, YouTube facade pattern, a larger-readership outlet
  to replace the ClearanceJobs URL in `author.elsewhere`, and the **Business
  Insider** entry (dropped for now — Mike was quoted but it is not worth the
  §3 Microsoft-naming question)

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
- **Existing site content is settled. Do not re-audit it as part of another
  task.** Everything already published was reviewed and approved; a scan that
  turns up something surprising means the note in this file is probably stale,
  not that the page is wrong. Say so in one line and carry on with the task
  that was actually asked for — do not open an investigation, and never edit
  approved copy to match a note here. §3's own list was the stale half twice in
  one session while the pages were right both times.
- **Binary assets reach the repo one way only: a commit.** Images pasted into
  chat and images read from OneDrive both arrive as *rendered pictures*, not as
  bytes that can be written to disk, so neither can be optimised and committed.
  The agreed workflow is therefore: **Mike uploads the original to a throwaway
  branch** (GitHub UI, switch the branch dropdown off `main` — e.g.
  `assets-inbox`), the assistant converts it to a sized WebP, commits **only**
  the WebP to `main`, and the branch is deleted. `main`'s history never carries
  the original. He has asked to be reminded of this each time, so remind him —
  a 9.9 MB JPG went into `main` before this was worked out, and history keeps
  it forever. The alternative, if he would rather not think about it: resize to
  ~640px WebP at squoosh.app before uploading.
- **Source documents are reachable — do not ask for manual exports.** The
  Microsoft 365 connector reads Mike's OneDrive *and* his OneNote notebooks
  (`sharepoint_search`, then `read_resource` on the returned URI). The canonical
  bio lives at `Notebooks/Mike Notebook/+WIMS To Do 2026/Website.one` → "Bio
  WIMS", with a docx copy under `Microsoft Copilot Chat Files/`. What is *not*
  reachable is the local disk on his PC: this session runs in an isolated cloud
  container with the repo cloned into it, so a `C:\Users\...` path means
  nothing here. Cloud services yes, local filesystem no.
- `web/README.md` and `studio/README.md` carry fuller reasoning for the
  decisions summarised here.
