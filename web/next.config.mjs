/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local assets in /public are already hand-optimised WebP; allow modern
    // formats for anything next/image processes going forward.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
