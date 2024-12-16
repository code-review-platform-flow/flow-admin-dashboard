/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  transpilePackages: ["antd"],
};

module.exports = nextConfig;
