import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Project lives in OneDrive — its sync races Turbopack's persistent-cache writes
  // and corrupts the on-disk format ("invalid digit found in string" on startup).
  // Disabling persistent cache is the supported fix; only effect is colder rebuilds.
  experimental: {
    turbopackFileSystemCacheForDev: false,
    turbopackFileSystemCacheForBuild: false,
  },
  images: {
    // Unsplash is used for gallery placeholders. Replace with real CDN domain at launch.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
