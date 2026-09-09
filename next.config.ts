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
  async redirects() {
    return [
      {
        source: "/experience",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/experience/:slug*",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/achievements",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/achievements/:slug",
        destination: "/articles/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
