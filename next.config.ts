import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Required when output:'export' — the built-in image optimisation endpoint
  // won't exist on static hosting, so images must be served as-is.
  images: { unoptimized: true },
};

export default nextConfig;
