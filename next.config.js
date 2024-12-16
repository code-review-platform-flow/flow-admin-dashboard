/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  transpilePackages: ["antd"],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://34.64.75.193/api/:path*',
        basePath: false
      }
    ]
  }
};

module.exports = nextConfig;
