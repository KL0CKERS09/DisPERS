import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includesPaths: [path.join(__dirname, "styles")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
      {
        protocol: "https",
        hostname: "scontent.fmnl8-4.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.fmnl8-6.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "scontent.fmnl8-1.fna.fbcdn.net",
      },
    ],
    domains: [
      'scontent.fmnl8-3.fna.fbcdn.net',
      'scontent.fmnl8-2.fna.fbcdn.net',
      'scontent.fmnl8-1.fna.fbcdn.net',
      'scontent.fmnl8-4.fna.fbcdn.net',
      'scontent.fmnl3-1.fna.fbcdn.net',
      'scontent.fmnl8-6.fna.fbcdn.net'
    ],
  },
};

export default nextConfig;
