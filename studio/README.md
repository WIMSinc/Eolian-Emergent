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

## The project it points at

**Project `b4qwtn71`, dataset `production` (public ACL).**
Studio: **https://eolian.sanity.studio/** — application `stx1x12dctuosp6merrpebmt`.

This replaced `n2qolqrd` on 2026-08-25. That project was deleted by a change to
the Vercel Marketplace integration, which owns the lifecycle of any project
billed through it — such a project is deleted by removing the resource in
Vercel, not through Sanity's own Manage UI, so the deletion carries no
confirmation on the Sanity side. The dataset went with it.

The site and the Studio must name the same project or the blog renders empty:
`SANITY_STUDIO_PROJECT_ID` here, `NEXT_PUBLIC_SANITY_PROJECT_ID` in Vercel.
Neither is hardcoded, so moving projects is an environment change rather than
a code change.

The dataset ACL must stay **public**. The site reads published documents
anonymously with no token, so a private dataset renders an empty blog with no
error to explain it.

## Setup

1. Create `.env` in this folder:

   ```
   SANITY_STUDIO_PROJECT_ID=b4qwtn71
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
   `sanity.cli.js` already carries the `appId`, so deploys no longer prompt for
   a hostname.

   **Logging in from a remote terminal** (Codespaces, a container, anything not
   your own machine): `sanity login` opens a browser flow that redirects to
   `localhost`, which never reaches a remote host, so the login hangs or fails.
   Skip it — create a token in Manage under **API → Tokens** with Administrator
   access and export it instead:

   ```bash
   export SANITY_AUTH_TOKEN=<token>
   npm run deploy
   ```

   If deploy fails with `missing required grant sanity.project.read`, the CLI is
   signed in as a different Sanity account than the one owning the project. Run
   `npx sanity logout`, then `npx sanity login`, then `npx sanity projects list`
   and confirm `b4qwtn71` appears before retrying.

`npm run dev` instead runs it at http://localhost:3333 without deploying.

## Restoring content

`content/blog-posts.ndjson` at the repo root holds the published posts as
Sanity documents, so the CMS is never the only copy:

```bash
npx sanity dataset import ../content/blog-posts.ndjson production --replace
```

`--replace` overwrites documents with matching `_id`s and leaves the rest
alone, so re-running it is safe.

Export after publishing, and keep the file current:

```bash
npx sanity dataset export production ../content/
```

Prefer **Archive** over **Delete** for a project you may want back. Archiving
is reversible; deleting is not.

## How publishing reaches the site

`/blog` and `/blog/[slug]` use `revalidate = 3600`, so a new post appears within
an hour with no redeploy. For instant publishing, add a Sanity webhook pointing
at a Vercel Deploy Hook.

## Writing for AEO

The `faqs` field is the highest-leverage thing in this schema. Entries render at
the end of the post and emit `FAQPage` structured data alongside `BlogPosting` —
that is what AI answer engines quote. Two to five genuine questions per post,
phrased the way someone would actually ask them.
