import { Helmet } from "react-helmet-async";

const SITE = "EolianVR";
const DEFAULT_DESC = "EolianVR delivers Augmented Reality and Virtual Reality solutions for defense, government, and enterprise. ARTAK platform for command & control, 3D mission planning, and situational awareness.";
const DEFAULT_IMG = "https://www.eolianvr.com/artak-overview.jpg";
const SITE_URL = "https://www.eolianvr.com";

export default function SEO({ title, description = DEFAULT_DESC, image = DEFAULT_IMG, path = "", noindex = false, type = "website", jsonLd = null }) {
  const fullTitle = title ? `${title} | ${SITE}` : `${SITE} | AR & VR Solutions for Defense & Enterprise`;
  const url = path ? `${SITE_URL}${path}` : SITE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}

export const organizationSchema = {
  "@context": "https://schema.org", "@type": "Organization", name: "EolianVR, Inc.", url: SITE_URL, logo: `${SITE_URL}/eolian-logo-white.png`,
  description: "EolianVR develops AR, VR, MR, AI/ML, and 3D Animation solutions for enterprise and government.",
  foundingDate: "2017", industry: "Defense Technology",
  contactPoint: { "@type": "ContactPoint", telephone: "+1-888-811-5339", contactType: "customer service" },
  knowsAbout: ["Augmented Reality", "Virtual Reality", "Mixed Reality", "Command and Control", "3D Mission Planning", "Situational Awareness", "Defense Technology"],
};

export function articleSchema({ title, description, image, slug, published }) {
  return {
    "@context": "https://schema.org", "@type": "Article", headline: title, description, image: image || DEFAULT_IMG,
    url: `${SITE_URL}/news/${slug}`, datePublished: published, dateModified: published,
    author: { "@type": "Organization", name: "EolianVR, Inc.", url: SITE_URL },
    publisher: { "@type": "Organization", name: "EolianVR, Inc.", logo: { "@type": "ImageObject", url: `${SITE_URL}/eolian-logo-white.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/news/${slug}` },
  };
}

export const websiteSchema = {
  "@context": "https://schema.org", "@type": "WebSite", name: "EolianVR", url: SITE_URL, description: DEFAULT_DESC,
  publisher: { "@type": "Organization", name: "EolianVR, Inc." },
};
