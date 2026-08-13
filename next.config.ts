import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  images: {
    qualities: [75, 90, 100],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion", "framer-motion", "clsx", "tailwind-merge"],
  },
};

export default nextConfig;
