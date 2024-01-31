/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
