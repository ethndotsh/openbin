const million = require("million/compiler");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com", "api.dicebear.com"],
  },
};

const millionConfig = {
  auto: true,
  mute: true,
  // if you're using RSC:
  auto: { rsc: true },
};

module.exports = million.next(nextConfig, millionConfig);
