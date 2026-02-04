/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Turbopack configuration (empty to use default)
  turbopack: {},

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
      },
    ],
  },

  // Headers for performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/public/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Output configuration for static export if needed
  output: "standalone",

  // PWA and performance
  async rewrites() {
    return [];
  },

  // Bundle analyzer in development
  ...(process.env.ANALYZE === "true" && {
    experimental: {
      bundleAnalyzer: {
        enabled: true,
      },
    },
  }),
};

export default nextConfig;
