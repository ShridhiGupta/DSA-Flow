import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
  eslint: {
    // Disable ESLint during builds to avoid circular dependency issues
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
