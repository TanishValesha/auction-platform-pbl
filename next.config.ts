import type { NextConfig } from "next";
import dotenv from "dotenv";
dotenv.config();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "stwrycmweudibfrjeujg.supabase.co",
      },
    ],
  },
};

export default nextConfig;
