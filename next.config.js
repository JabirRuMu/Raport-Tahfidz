/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Menjadikan project sebagai HTML statis
  images: {
    unoptimized: true, // Wajib diaktifkan untuk GitHub Pages
  },
  basePath: '/web-raport', // Ganti dengan nama repo GitHub Anda jika bukan root
  trailingSlash: true, // Untuk static export
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
