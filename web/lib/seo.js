/**
 * Shared SEO/AEO constants and schema builders.
 *
 * In the CRA app this lived in components/SEO.jsx and rendered tags client-side
 * through react-helmet. Under Next these values feed the Metadata API instead,
 * so the tags and JSON-LD are present in the server-rendered HTML — which is
 * what non-JS crawlers (GPTBot, ClaudeBot, PerplexityBot) actually read.
 */

export const SITE = "EolianVR";
export const SITE_URL = "https://www.eolianvr.com";
export const DEFAULT_DESC =
  "EolianVR delivers Augmented Reality and Virtual Reality solutions for defense, government, and enterprise. ARTAK platform for command & control, 3D mission planning, and situational awareness.";
export const DEFAULT_IMG = `${SITE_URL}/artak-overview.jpg`;

/**
 * Build a Next Metadata object for a route. Mirrors the props the old SEO
 * component took, so porting a page is a mechanical swap.
 */
export function pageMetadata({
  title,
  description = DEFAULT_DESC,
  image = DEFAULT_IMG,
  path = "",
  noindex = false,
  type = "website",
} = {}) {
  const url = path ? `${SITE_URL}${path}` : SITE_URL;
  const fullTitle = title ? `${title} | ${SITE}` : `${SITE} | AR & VR Solutions for Defense & Enterprise`;
  return {
    title: title || undefined,
    description,
    alternates: { canonical: path || "/" },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      siteName: SITE,
      url,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EolianVR, Inc.",
  url: SITE_URL,
  logo: `${SITE_URL}/eolian-logo-white.webp`,
  description:
    "EolianVR develops AR, VR, MR, AI/ML, and 3D Animation solutions for enterprise and government.",
  foundingDate: "2017",
  industry: "Defense Technology",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-888-811-5339",
    contactType: "customer service",
  },
  knowsAbout: [
    "Augmented Reality",
    "Virtual Reality",
    "Mixed Reality",
    "Command and Control",
    "3D Mission Planning",
    "Situational Awareness",
    "Defense Technology",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE,
  url: SITE_URL,
  description: DEFAULT_DESC,
  publisher: { "@type": "Organization", name: "EolianVR, Inc." },
};

export function articleSchema({ title, description, image, slug, published }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image || DEFAULT_IMG,
    url: `${SITE_URL}/news/${slug}`,
    datePublished: published,
    dateModified: published,
    author: { "@type": "Organization", name: "EolianVR, Inc.", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "EolianVR, Inc.",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/eolian-logo-white.webp` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/news/${slug}` },
  };
}

/**
 * Product/Offer schema — new in the Next build. Google Merchant Center and AI
 * answer engines both want this per sellable item; the CRA site had no way to
 * emit it server-side. `amount` is in cents, matching Stripe.
 */
export function productSchema({ name, description, image, sku, amount, path, availability = "InStock" }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    sku,
    image: image ? `${SITE_URL}${image}` : DEFAULT_IMG,
    brand: { "@type": "Brand", name: "EolianVR" },
    ...(amount
      ? {
          offers: {
            "@type": "Offer",
            price: (amount / 100).toFixed(2),
            priceCurrency: "USD",
            availability: `https://schema.org/${availability}`,
            url: `${SITE_URL}${path || ""}`,
            seller: { "@type": "Organization", name: "EolianVR, Inc." },
          },
        }
      : {}),
  };
}

/**
 * BlogPosting schema for a Sanity-authored post.
 *
 * Distinct from articleSchema() above, which was written for the CRA-era
 * /news routes that were never wired up. Fields map straight onto the Sanity
 * document, so the structured data stays in step with what the page renders.
 */
export function blogPostingSchema({ title, description, image, slug, published, modified }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: image || DEFAULT_IMG,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: published,
    dateModified: modified || published,
    author: { "@type": "Organization", name: "EolianVR, Inc.", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "EolianVR, Inc.",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/eolian-logo-white.webp` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
  };
}

/** FAQPage schema — the highest-leverage AEO addition for answer engines. */
export function faqSchema(entries) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
