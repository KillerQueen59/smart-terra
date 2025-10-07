/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    turbo: {
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
        '.json',
      ],
    },
  },
  webpack: (config, { isServer }) => {
    // Handle leaflet and geospatial libraries
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Handle specific modules that might cause issues
    config.resolve.alias = {
      ...config.resolve.alias,
      'leaflet': 'leaflet/dist/leaflet.js',
    };

    return config;
  },
  transpilePackages: ['leaflet', 'react-leaflet'],
};

module.exports = nextConfig;