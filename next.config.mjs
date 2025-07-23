/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.leetcode.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "leetcode.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.hackerrank.com",
        pathname: "/certificates/**",
      }
    ],
  },
};

export default nextConfig;
