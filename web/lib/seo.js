/**
 * Shared SEO/AEO constants and schema builders.
 *
 * In the CRA app this lived in components/SEO.jsx and rendered tags client-side
 * through react-helmet. Under Next these values feed the Metadata API instead,
 * so the tags and JSON-LD are present in the server-rendered HTML — which is
 * what non-JS crawlers (GPTBot, ClaudeBot, PerplexityBot) actually read.
 */

import { AUTHORS, getAuthor } from "@/data/team";

export const SITE = "EolianVR";
export const SITE_URL = "https://www.eolianvr.com";
export const DEFAULT_DESC =
  "EolianVR delivers Augmented Reality and Virtual Reality solutions for defense, government, and enterprise. ARTAK platform for command & control, 3D mission planning, and situational awareness.";
export const DEFAULT_IMG = `${SITE_URL}/artak-overview.jpg`;

/**
 * Stable identifier for an author.
 *
 * The point of a fixed @id is entity consolidation. Without it, the byline on
 * a post, the founder named in Organization schema and the author page each
 * describe a separate unnamed Person, and a search or answer engine sees three
 * disconnected people who happen to share a name. With it, every mention
 * resolves to one node — so credentials asserted on the author page attach to
 * the byline on every post, which is the whole reason to byline posts at all.
 */
export function personId(slug) {
  return `${SITE_URL}/team/${slug}#person`;
}

/**
 * Full Person entity. Emitted once, on the author's own page.
 *
 * Everywhere else references personId() rather than restating this, so the
 * credentials live in exactly one place.
 */
export function personSchema(author) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId(author.slug),
    name: author.name,
    url: `${SITE_URL}/team/${author.slug}`,
    jobTitle: author.title,
    description: author.bio?.[0],
    worksFor: { "@type": "Organization", name: "EolianVR, Inc.", url: SITE_URL },
    ...(author.knowsAbout?.length ? { knowsAbout: author.knowsAbout } : {}),
    // Omitted entirely when empty rather than emitted as []. An empty sameAs
    // asserts "this person has no findable profiles", which is false and worse
    // than staying silent.
    ...(author.sameAs?.length ? { sameAs: author.sameAs } : {}),
  };
}

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
  // A founder with an author page is referenced by the same @id their byline
  // uses, so the company and its posts point at one person rather than two
  // same-named strangers. A founder without a page stays a plain Person: an
  // @id pointing at a URL that does not exist is worse than no @id.
  founder: [
    { "@type": "Person", name: "Michael McCormack" },
    ...(AUTHORS["mike-simmons"]
      ? [
          {
            "@type": "Person",
            "@id": personId("mike-simmons"),
            name: AUTHORS["mike-simmons"].name,
            url: `${SITE_URL}/team/mike-simmons`,
          },
        ]
      : [{ "@type": "Person", name: "Mike Simmons" }]),
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
export function blogPostingSchema({ title, description, image, slug, published, modified, authorSlug }) {
  const author = getAuthor(authorSlug);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: image || DEFAULT_IMG,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: published,
    dateModified: modified || published,
    // A named Person referenced by @id, not the company. Answer engines weight
    // a post written by an identifiable practitioner over one credited to a
    // logo — but only when the byline resolves to an entity whose credentials
    // are stated somewhere, which is what /team/<slug> exists to do. Falls back
    // to the organization if an author is ever unresolvable, so a bad key
    // degrades to the previous behaviour rather than to no author at all.
    author: author
      ? {
          "@type": "Person",
          "@id": personId(author.slug),
          name: author.name,
          url: `${SITE_URL}/team/${author.slug}`,
        }
      : { "@type": "Organization", name: "EolianVR, Inc.", url: SITE_URL },
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
export function softwareApplicationSchema({ lowPrice, highPrice, offerCount } = {}) {
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
    // ARTAK ships in Blocks rather than point releases, and an answer engine
    // asked "what version of ARTAK is current" has nowhere else to read it.
    // releaseNotes points at the post that is the long form of the capability
    // grid in components/FeaturesSection.jsx, so the two stay in step.
    softwareVersion: "Block 3",
    releaseNotes: `${SITE_URL}/blog/artak-block-3-whats-new`,
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
      "Doctrinal symbology built to MIL-STD-2525E",
      "Weapon inventory with enforced engagement ranges and blast radii",
      "Immersion Mode walkthroughs of interiors, multi-floor and subterranean spaces",
    ],
    ...(lowPrice
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: (lowPrice / 100).toFixed(2),
            // Google's Product snippet check reports `highPrice` missing when an
            // AggregateOffer carries only a low price. Both come from the same
            // catalogue the per-SKU Offers price against, so the range cannot
            // disagree with what /products/<slug> shows.
            ...(highPrice ? { highPrice: (highPrice / 100).toFixed(2) } : {}),
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

/**
 * HowTo schema for an ordered procedure.
 *
 * Added for /acquire, which walks a unit and a contracting officer through
 * buying ARTAK under Simplified Acquisition Procedures and — until now —
 * emitted no JSON-LD at all. The steps already exist as structured data in
 * data/acquireGuide.js, so this reads them rather than restating them; the
 * page and the schema cannot drift.
 *
 * Worth being precise about what this does and does not buy. Google retired
 * HowTo *rich results* in 2023, so this will not produce a how-to card in
 * search. It is here for answer engines: it marks an ordered procedure as an
 * ordered procedure, so a crawler extracting "how does a unit buy ARTAK"
 * gets the six steps in sequence rather than inferring them from prose.
 */
export function howToSchema({ name, description, steps, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    // The section anchor, which the page really renders. Individual steps have
    // no anchor of their own, so none is claimed — a step URL pointing at a
    // fragment that does not exist is worse than no step URL.
    url: `${SITE_URL}${path}`,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };
}
