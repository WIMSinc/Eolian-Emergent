import { SITE_URL } from "@/lib/seo";
import { slugs } from "@/data/artakUseCases";
import { ALL_PRODUCTS } from "@/lib/products";
import { getAllPosts } from "@/lib/sanity";

/**
 * Generated sitemap, served at /sitemap.xml.
 *
 * Replaces the hand-maintained public/sitemap.xml, which had drifted — it was
 * missing /acquire and /artak/national-security, and robots.txt pointed at an
 * /api/sitemap.xml endpoint that never existed. Deriving the ARTAK use-case
 * URLs from the same data the routes use means that class of drift cannot
 * recur for those pages.
 *
 * /admin* and /checkout/* are deliberately absent: the former is disallowed in
 * robots.txt, the latter is noindex and only reachable after a Stripe redirect.
 */
export default async function sitemap() {
  const now = new Date();

  const staticRoutes = [
    ["/", 1.0, "weekly"],
    ["/artak", 0.9, "weekly"],
    ["/acquire", 0.9, "weekly"],
    ["/products", 0.9, "weekly"],
    ["/blog", 0.8, "weekly"],
    ["/artak/national-security", 0.7, "monthly"],
    ["/about", 0.8, "monthly"],
    ["/about/past-performance", 0.7, "monthly"],
    ["/about/awards", 0.6, "monthly"],
    ["/about/intellectual-property", 0.6, "monthly"],
    ["/mapmaker", 0.8, "monthly"],
    ["/services", 0.8, "monthly"],
    ["/lab", 0.6, "monthly"],
    ["/team", 0.6, "monthly"],
    ["/support", 0.6, "monthly"],
    ["/privacy", 0.3, "yearly"],
    ["/terms", 0.3, "yearly"],
  ];

  // Blog URLs come from Sanity. getAllPosts() returns [] when the CMS is not
  // configured or unreachable, so the sitemap degrades rather than failing.
  const posts = await getAllPosts();

  return [
    ...staticRoutes.map(([path, priority, changeFrequency]) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...ALL_PRODUCTS.map((p) => ({
      url: `${SITE_URL}${p.href}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p._updatedAt ? new Date(p._updatedAt) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...slugs.map((slug) => ({
      url: `${SITE_URL}/artak/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
