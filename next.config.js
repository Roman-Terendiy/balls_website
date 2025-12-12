/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Better compatibility with static hosting
}

module.exports = nextConfig

