/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.shopify.com"], // Add other domains here as needed
  },
  env: {
    NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN:
      process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN:
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  },
};

export default nextConfig;
