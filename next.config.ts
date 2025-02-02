import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Disable experimental features
  },
  webpack: (config, { isServer }) => {
    // Disable source maps
    config.devtool = false;
    return config;
  },
  poweredByHeader: false,
  generateEtags: false,
}

export default nextConfig