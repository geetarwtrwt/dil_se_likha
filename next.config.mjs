/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    middlewareSrc: "src/middleware.js",
  },
};

export default nextConfig;
