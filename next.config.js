/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'www.pexels.com',
      }
    ],
  },
  webpack: (config, { dev, isServer }) => {
    // Disable webpack cache in development to prevent corruption
    if (dev) {
      config.cache = false;
    }
    return config;
  },
  // Alternative: Configure cache differently for better stability
  experimental: {
    // Disable webpack build worker if cache issues persist
    webpackBuildWorker: false,
  },
}

module.exports = nextConfig;