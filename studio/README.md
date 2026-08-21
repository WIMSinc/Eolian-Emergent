# EolianVR Studio

Sanity Studio for the blog at eolianvr.com/blog.

Kept out of the Next app deliberately. Embedding it would pull the full Sanity
toolkit into the marketing site's build for the benefit of a single author, and
that site has a carefully tuned performance and build budget. This deploys
separately to a hosted Studio instead.

## One-time setup

1. Create a project at https://sanity.io/manage (free tier is ample).
2. Note the **Project ID** and use the `production` dataset.
3. Create `.env` here:

   ```
   SANITY_STUDIO_PROJECT_ID=your-project-id
   SANITY_STUDIO_DATASET=production
   ```

4. Add the CORS origin `https://www.eolianvr.com` in sanity.io/manage
   (API → CORS origins). Credentials are not required — the site reads
   published content anonymously.

5. In Vercel, add to the `eolian-emergent` project:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

   Until these are set the blog renders an empty state; it never fails a build.

## Running and deploying

```bash
cd studio
npm install
npm run dev      # http://localhost:3333
npm run deploy   # hosted at <project-id>.sanity.studio
```

## How publishing reaches the site

`/blog` and `/blog/[slug]` use `revalidate = 3600`, so a new post appears within
an hour with no redeploy. To publish instantly, trigger a Vercel redeploy — or
add a Sanity webhook pointing at a Vercel Deploy Hook.

## Writing for AEO

The `faqs` field is the highest-leverage thing in this schema. Entries render at
the end of the post and emit `FAQPage` structured data alongside `BlogPosting` —
that is what AI answer engines quote. Two to five genuine questions per post,
phrased the way someone would actually ask them.
