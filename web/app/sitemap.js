import { SITE_URL } from "@/lib/seo";
import { slugs } from "@/data/artakUseCases";

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
export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    ["/", 1.0, "weekly"],
    ["/artak", 0.9, "weekly"],
    ["/acquire", 0.9, "weekly"],
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

  return [
    ...staticRoutes.map(([path, priority, changeFrequency]) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...slugs.map((slug) => ({
      url: `${SITE_URL}/artak/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
