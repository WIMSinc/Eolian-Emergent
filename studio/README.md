# EolianVR Studio

Sanity Studio for the blog at eolianvr.com/blog.

## Why this is separate from the site

Embedding the Studio at `/studio` inside the Next app was tried and reverted.
It worked, but pulling the `sanity` toolkit into the site's dependencies took
the audit from **0 advisories to 9** — all transitives of `@sanity/cli`
(`js-yaml`, `smol-toml`, `uuid`) that never execute at runtime, but still sit in
the tree the production site is built from. Keeping the CMS out means the
deployed site depends on nothing it does not actually serve.

The only cost is that you write at a different URL. Visitors are unaffected
either way — they never see the Studio in either arrangement.

Note: blocking the Studio from crawlers has **no bearing on blog SEO**.
`/blog` and `/blog/<slug>` are separate URLs, and they stay indexed, in the
sitemap, and carrying `BlogPosting` + `FAQPage` schema.

## Setup

1. Create `.env` in this folder:

   ```
   SANITY_STUDIO_PROJECT_ID=n2qolqrd
   SANITY_STUDIO_DATASET=production
   ```

   The `SANITY_STUDIO_` prefix is required — Sanity only exposes variables with
   that prefix to the Studio build.

2. ```bash
   npm install
   npm run deploy
   ```

   Sign in when prompted. The Studio is live at **https://eolian.sanity.studio/**
   and `deploy` registers that host with Sanity, so no CORS entry is needed.

   If deploy fails with `missing required grant sanity.project.read`, the CLI is
   signed in as a different Sanity account than the one owning the project. Run
   `npx sanity logout`, then `npx sanity login`, then `npx sanity projects list`
   and confirm `n2qolqrd` appears before retrying.

`npm run dev` instead runs it at http://localhost:3333 without deploying.

## How publishing reaches the site

`/blog` and `/blog/[slug]` use `revalidate = 3600`, so a new post appears within
an hour with no redeploy. For instant publishing, add a Sanity webhook pointing
at a Vercel Deploy Hook.

## Writing for AEO

The `faqs` field is the highest-leverage thing in this schema. Entries render at
the end of the post and emit `FAQPage` structured data alongside `BlogPosting` —
that is what AI answer engines quote. Two to five genuine questions per post,
phrased the way someone would actually ask them.
