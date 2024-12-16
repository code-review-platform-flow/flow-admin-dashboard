/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  transpilePackages: ["antd"],
  async rewrites() {
    return [
      {
        source: '/api/auth/signin',
        destination: 'http://34.64.75.193/api/auth/signin'
      },
      {
        source: '/api/auth/session',
        destination: 'http://34.64.75.193/api/auth/session'
      },
      {
        source: '/api/auth/providers',
        destination: 'http://34.64.75.193/api/auth/providers'
      },
      {
        source: '/api/auth/callback/:path*',
        destination: 'http://34.64.75.193/api/auth/callback/:path*'
      },
      {
        source: '/api/auth/signout',
        destination: 'http://34.64.75.193/api/auth/signout'
      },
      {
        source: '/api/auth/error',
        destination: 'http://34.64.75.193/api/auth/error'
      },
      {
        source: '/api/:path*',
        destination: 'http://34.64.75.193/api/:path*'
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ]
      }
    ];
  }
};

module.exports = nextConfig;
