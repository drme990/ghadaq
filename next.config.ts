import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextIntlConfig = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'placehold.co' },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  env: {
    BASE_URL: process.env.BASE_URL || 'https://www.ghadqplus.com',
  },
  async rewrites() {
    const manasikUrl = process.env.MANASIK_API_URL || 'https://www.manasik.net';
    return [
      {
        source: '/api/:path*',
        destination: `${manasikUrl}/api/:path*`,
      },
    ];
  },
};

export default nextIntlConfig(nextConfig);
