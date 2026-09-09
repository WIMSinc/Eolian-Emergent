import { withSentryConfig } from "@sentry/nextjs";

/**
 * @type {import('next').NextConfig}
 */

// Vercel sets VERCEL_ENV to "production" | "preview" | "development".
// Anything that is not production is a staging copy of the live marketing site,
// and an indexable staging copy would compete with eolianvr.com for its own
// terms. Belt-and-braces alongside Vercel Authentication, because the header
// applies even if protection is later relaxed for a reviewer.
const isProduction = process.env.VERCEL_ENV === "production";

const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local assets in /public are already hand-optimised WebP; allow modern
    // formats for anything next/image processes going forward.
    formats: ["image/avif", "image/webp"],
  },
  /**
   * Redirects for URLs the pre-migration site served that this one does not.
   *
   * A 404 tells Google the page is gone and discards whatever authority the URL
   * had; a 301 hands it to the replacement. Everything below is a path Search
   * Console reported under "Not found (404)", so each one is a URL something out
   * there still links to or remembers — not a guess at what WordPress might have
   * served.
   *
   * The old site was WooCommerce, so /product/ and /product-tag/ are entire
   * namespaces this site does not have. The named entries map the ones Google
   * listed onto their real replacements; the two wildcards at the end catch the
   * rest of those namespaces rather than waiting for each to be reported. Next
   * matches in order, so the specific rules must stay above the wildcards.
   *
   * Not redirected on purpose: /dsc0f4677-copy/, a WordPress image attachment
   * page. Nothing on this site replaces it, and pointing an unrelated URL at the
   * homepage is what Google treats as a soft 404 — a genuine 404 is the honest
   * answer and app/not-found.js now serves it without a canonical.
   */
  async redirects() {
    return [
      // Contact lives on the homepage now, as an anchor rather than a route.
      // It appears as an original source on HubSpot contacts created before the
      // migration, so it was being reached by real people, not only crawlers.
      { source: "/contact", destination: "/#contact", permanent: true },

      // ARTAK was "TAK" on the old site before the product was named.
      { source: "/tak", destination: "/artak", permanent: true },

      // WooCommerce product pages. The -hl2 suffixes were HoloLens 2 variants
      // of kits that are now one SKU each, headset choice being a spec rather
      // than a separate product.
      {
        source: "/product/artak-brigadehq-kit",
        destination: "/products/artak-brigade-hq-kit",
        permanent: true,
      },
      {
        source: "/product/artak-battalion-hq-kit-hl2",
        destination: "/products/artak-battalion-hq-kit",
        permanent: true,
      },
      {
        source: "/product/artak-platoon-kit-hl2",
        destination: "/products/artak-platoon-kit",
        permanent: true,
      },
      {
        source: "/product/artak-platoon-kit",
        destination: "/products/artak-platoon-kit",
        permanent: true,
      },
      {
        source: "/product/artak-backend-software-subscription-1-year",
        destination: "/products/artak-backend-software-subscription-1-year",
        permanent: true,
      },

      // Map Maker is a page rather than a purchasable SKU now, and it is also
      // the closest match for the two tag archives Google reported: both listed
      // drone-capture and digital-twin products.
      {
        source: "/product/3d-mapmaker-processing-kit",
        destination: "/mapmaker",
        permanent: true,
      },
      { source: "/product-tag/skydio-x10", destination: "/mapmaker", permanent: true },
      { source: "/product-tag/digital-twins", destination: "/mapmaker", permanent: true },

      // Anything else left in the WooCommerce namespaces. Keep last.
      { source: "/product/:slug", destination: "/products", permanent: true },
      { source: "/product-tag/:slug", destination: "/products", permanent: true },
    ];
  },

  async headers() {
    const rules = [];

    if (!isProduction) {
      rules.push({
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      });
    }

    // Long-lived caching for the hand-optimised static assets, matching what
    // frontend/vercel.json did for the CRA build. Next handles /_next/static
    // itself, so only /public assets need this.
    rules.push(
      {
        source: "/:file*.webp",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/hero-bg-terrain-v2.mp4",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    );

    return rules;
  },
};

// Source maps are uploaded only when an auth token is present, so local builds
// and any environment without SENTRY_AUTH_TOKEN still succeed — they just ship
// minified stack traces, exactly as before.
const sentryEnabled = Boolean(process.env.SENTRY_AUTH_TOKEN);

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  sourcemaps: { disable: !sentryEnabled },
  // Strip the uploaded source maps from the deployed output so the readable
  // source is not publicly served alongside the bundle.
  widenClientFileUpload: true,
  disableLogger: true,
});
