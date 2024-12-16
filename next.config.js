/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  transpilePackages: ["antd"],
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'http://34.64.75.193/api/auth/:path*',
        basePath: false
      },
      {
        source: '/api/:path*',
        destination: 'http://34.64.75.193/api/:path*',
        basePath: false
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'http://34.64.82.226' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ]
      }
    ];
  }
};

module.exports = nextConfig;
