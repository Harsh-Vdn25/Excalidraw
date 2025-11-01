import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_APIURL: process.env.NEXT_PUBLIC_APIURL,
    NEXT_PUBLIC_WSURL: process.env.NEXT_PUBLIC_WSURL,
  },
};

export default nextConfig;