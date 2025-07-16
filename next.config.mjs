// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kanakina.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    // ★★ここからが、追記する部分です★★
      {
        protocol: 'https',
        hostname: 'cms.kanakina.com', // 新しい取引先（厨房）のアドレス
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      // ★★ここまでが、追記する部分です★★  
    ],
  },
};

export default nextConfig;