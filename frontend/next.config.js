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
      },
      {
        protocol: "https",
        hostname: "teknasyon-mailling.s3.eu-central-1.amazonaws.com",
        port: '',
        pathname: '/challenge/frontend/img/**'
      }
    ],
    domains: ["cdn.alikuxac.xyz"],
  }
}

module.exports = nextConfig
