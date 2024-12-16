/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  transpilePackages: ["antd"],
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'http://34.64.82.226/api/auth/:path*'
      },
      {
        source: '/api/auth/callback/:path*',
        destination: 'http://34.64.82.226/api/auth/callback/:path*'
      },
      {
        source: '/api/auth/session',
        destination: 'http://34.64.82.226/api/auth/session'
      },
      {
        source: '/api/:path*',
        destination: 'http://34.64.75.193/api/:path*'
      }
    ];
  }
};

module.exports = nextConfig;
