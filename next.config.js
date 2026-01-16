/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Menjadikan project sebgai HTML statis
  imges: {
    unoptimized: true, //Wajib diaktifkan untuk GitHub Pages
}
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
