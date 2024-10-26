import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //  images: {
  //   domains: ['image.tmdb.org'],
  // },
  images: {
    remotePatterns: [
      {
        // Allow images from TMDB
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**", // Allows all paths that start with /t/p/
      },
    ],
  },
  reactStrictMode: true,
  experimental: {
    // appDir: true, // Ensure this is set to true
  },
};

export default nextConfig;
