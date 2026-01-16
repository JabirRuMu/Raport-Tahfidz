/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Menjadikan project sebagai HTML statis
  images: {
    unoptimized: true, // Wajib diaktifkan untuk GitHub Pages
  },
  basePath: '/Raport-Tahfidz', // Sesuai nama repo GitHub
  trailingSlash: true, // Untuk static export
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
