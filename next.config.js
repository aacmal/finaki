/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/app',
        destination: '/app/dashboard',
        permanent: true,
      },
      {
        source: '/auth',
        destination: '/auth/login',
        permanent: true,
      },
      {
        source: '/demo',
        destination: '/demo/dashboard',
        permanent: true,
      }
    ]
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
