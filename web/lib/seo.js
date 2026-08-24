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
  // 2016 matches the About page copy; the schema previously said 2017 and
  // contradicted it.
  foundingDate: "2016",
  founder: [
    { "@type": "Person", name: "Michael McCormack" },
    { "@type": "Person", name: "Mike Simmons" },
  ],
  industry: "Defense Technology",
  address: {
    "@type": "PostalAddress",
    streetAddress: "12577 66th St",
    addressLocality: "Largo",
    addressRegion: "FL",
    postalCode: "33773-3440",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-305-562-9639",
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

/**
 * ARTAK as a SoftwareApplication.
 *
 * Deliberately multi-typed as ["SoftwareApplication", "Product"] rather than
 * emitting two separate blocks. ARTAK is genuinely both, but it is one thing —
 * two sibling blocks would describe it as two distinct entities competing for
 * the same identity. schema.org allows an array of types, and Google resolves a
 * multi-typed node as a single entity eligible for both treatments.
 *
 * Per-SKU pricing stays on /products/<slug>, where each licence and kit carries
 * its own Offer. Here `offers` is an AggregateOffer computed from the same
 * catalogue, so the low price cannot drift from what the product pages show.
 */
export function softwareApplicationSchema({ lowPrice, offerCount } = {}) {
  return {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "Product"],
    name: "ARTAK",
    alternateName: "Augmented Reality Team Awareness Kit",
    url: `${SITE_URL}/artak`,
    description:
      "ARTAK is a multi-domain joint planning and command & control platform. It synchronizes planning and C2 activities across echelons, domains, and warfighting functions, bringing command and staff into a single digital decision environment.",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Command and Control / Mission Planning",
    operatingSystem: "Meta Quest, Windows, Android, iOS, macOS",
    image: `${SITE_URL}/artak-overview.jpg`,
    brand: { "@type": "Brand", name: "EolianVR" },
    publisher: { "@type": "Organization", name: "EolianVR, Inc.", url: SITE_URL },
    featureList: [
      "Multi-domain joint mission planning",
      "Real-time common operating picture",
      "3D terrain and digital twin visualization",
      "Device agnostic across AR, VR, tablet, phone and desktop",
      "ATAK / WinTAK / iTAK ecosystem integration",
      "Collaborative rehearsal and after-action review",
    ],
    ...(lowPrice
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: (lowPrice / 100).toFixed(2),
            offerCount,
            url: `${SITE_URL}/products`,
            seller: { "@type": "Organization", name: "EolianVR, Inc." },
          },
        }
      : {}),
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
