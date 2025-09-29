import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    domains: [
      "gnezrlgbprtsqyzkicxy.supabase.co", // <-- add your Supabase project domain
    ],
  },
};

export default nextConfig;
