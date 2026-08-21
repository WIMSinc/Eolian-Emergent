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
        source: "/hero-bg-terrain.mp4",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    );

    return rules;
  },
};

export default nextConfig;
