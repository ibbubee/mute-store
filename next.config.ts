import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["helping-spirits-informal-approaches.trycloudflare.com"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
};

export default nextConfig;
