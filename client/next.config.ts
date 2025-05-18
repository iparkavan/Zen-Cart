import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Next 13.4+ preferred way
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        pathname: "/**", // allow all paths below this host
      },
      // add more hosts here if needed
    ],
  },
};

export default nextConfig;
