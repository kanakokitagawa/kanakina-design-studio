// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.stories\.(js|jsx|ts|tsx)$/,
        loader: 'ignore-loader',
      });
    }
    return config;
  },
};

export default nextConfig;