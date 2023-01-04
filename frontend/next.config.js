/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.alikuxac.xyz",
        port: '',
        pathname: '/file/doanali/**',
      }
    ],
    domains: ["cdn.alikuxac.xyz"],
  }
}

module.exports = nextConfig
