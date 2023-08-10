/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: "/install.sh",
        destination:
          "https://raw.githubusercontent.com/ethndotsh/openbin/main/install.sh",
        permanent: false,
      },
      {
        source: "/install.ps1",
        destination:
          "https://raw.githubusercontent.com/ethndotsh/openbin/main/install.ps1",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
