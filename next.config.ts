import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Optimization is enabled (Vercel handles it via its Image Optimization API).
    // Individual <Image> components that pass unoptimized={true} opt out per-image.
    unoptimized: false,
  },
};

export default nextConfig;
