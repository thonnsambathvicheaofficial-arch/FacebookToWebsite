
import type { NextConfig } from "next";

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/",
  sw: "service-worker.js",
});

const nextConfig: NextConfig = {
  /* 
   * @ducanh2912/next-pwa uses Webpack, which conflicts with Next.js 15+ Turbopack default 
   * unless we explicitly provide a turbopack config or opt out.
   */
  // @ts-ignore
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'graph.facebook.com',
      },
      {
        protocol: 'https',
        hostname: 'scontent.fpnh4-1.fna.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'scontent.fpnh4-1.fna.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: '**.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default withPWA(nextConfig);
