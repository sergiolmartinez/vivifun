/** @type {import('next').NextConfig} */
const nextConfig = {
  // Set the following to true if you want to disable Image Optimzation with Vercel
  // images: {
  //   unoptimized: true,
  // },
  reactStrictMode: true,
  images: {
    domains: ["vivifun.s3.us-east-2.amazonaws.com"],
  },
};

export default nextConfig;
