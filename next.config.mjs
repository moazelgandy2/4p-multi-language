import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   esmExternals: true, 
  // },
  // compiler : {
  //   removeConsole : true
  // },
  webpack(config, { isServer }) {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimize = true;
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.43', 
      }
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);