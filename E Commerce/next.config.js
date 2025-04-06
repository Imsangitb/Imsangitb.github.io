/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images-eu.ssl-images-amazon.com',
      'images-na.ssl-images-amazon.com',
      'images.pexels.com',
      'assets.myntassets.com',
      'rukminim1.flixcart.com',
      'rukminim2.flixcart.com'
    ],
  },
  i18n: {
    locales: ['en', 'hi'],
    defaultLocale: 'en',
  },
  basePath: process.env.NODE_ENV === 'production' ? '/student-affiliate-ecommerce' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/student-affiliate-ecommerce/' : '',
};

module.exports = nextConfig; 