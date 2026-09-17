import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**'
        }
      ]
    },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin-panel',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
