import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

/**
 * Sanity content layer for the blog.
 *
 * Deliberately degrades to empty rather than throwing when the project is not
 * configured. eolianvr.com builds from this app, so a missing environment
 * variable must never fail a production deploy — the blog simply renders an
 * empty state until NEXT_PUBLIC_SANITY_PROJECT_ID is set.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const isSanityConfigured = Boolean(projectId);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Published content only, served from the CDN. Nothing here is private,
      // so no token is needed and requests stay cacheable.
      useCdn: true,
      perspective: "published",
    })
  : null;

const builder = isSanityConfigured ? imageUrlBuilder(sanityClient) : null;

/** Build a CDN image URL. Returns null when unconfigured or given no source. */
export function urlForImage(source, { width, height } = {}) {
  if (!builder || !source?.asset) return null;
  let img = builder.image(source).auto("format").fit("max");
  if (width) img = img.width(width);
  if (height) img = img.height(height);
  return img.url();
}

const POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  _updatedAt,
  coverImage,
  tags,
  seoTitle,
  seoDescription,
  faqs[]{question, answer}
`;

async function safeFetch(query, params = {}, fallback) {
  if (!sanityClient) return fallback;
  try {
    return await sanityClient.fetch(query, params);
  } catch (err) {
    // A CMS outage should degrade the blog, not take down the site.
    console.error("Sanity fetch failed:", err?.message);
    return fallback;
  }
}

export function getAllPosts() {
  return safeFetch(
    `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]
      | order(publishedAt desc){${POST_FIELDS}}`,
    {},
    [],
  );
}

export function getPostSlugs() {
  return safeFetch(
    `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current`,
    {},
    [],
  );
}

export function getPostBySlug(slug) {
  return safeFetch(
    `*[_type == "post" && slug.current == $slug][0]{${POST_FIELDS}, body}`,
    { slug },
    null,
  );
}

/** Reading time in minutes, estimated from the Portable Text body. */
export function readingTime(body) {
  if (!Array.isArray(body)) return null;
  const words = body
    .filter((b) => b._type === "block")
    .flatMap((b) => (b.children || []).map((c) => c.text || ""))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return words ? Math.max(1, Math.round(words / 225)) : null;
}
