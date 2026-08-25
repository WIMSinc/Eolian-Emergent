# content/

`blog-posts.ndjson` — the two published Insights posts, as Sanity documents.

**Why this is committed.** On 2026-08-25 the Sanity project `n2qolqrd` was
deleted by a change to the Vercel Marketplace integration, which owns that
project's lifecycle. The original import file lived only in an ephemeral
working directory, so the dataset and its only backup went at the same time.
These documents were reconstructed from the rendered HTML of the live pages.
Keeping the source in git means the CMS is no longer the single copy.

Reconstructed, and equal to what the deleted dataset held: 27 and 26 body
blocks, 12 and 13 FAQs.

## Restoring into a project

```bash
cd studio
npx sanity dataset import ../content/blog-posts.ndjson production --replace
```

`--replace` overwrites documents with matching `_id`s and leaves everything
else untouched, so re-running it is safe.

Set the project first — `sanity.config.js` in `studio/`, and
`NEXT_PUBLIC_SANITY_PROJECT_ID` in Vercel for the site. Both must point at the
same project or the blog renders empty.

## After importing

A published post reaches `/blog` and `/sitemap.xml` within the hour, or
immediately on a redeploy. Check both, not just the post URL.

## Not included

A third post existed only as a draft and was never published. Drafts are
filtered out of every query, so no rendered copy exists anywhere and it could
not be reconstructed. It is recoverable only from the Sanity project itself.
