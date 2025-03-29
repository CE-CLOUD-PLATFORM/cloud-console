import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/signin',
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  output: "standalone",
};

export default nextConfig;
