/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
