/** @type {import('next').NextConfig} */
const nextConfig = {
  // Set the following to true if you want to disable Image Optimzation with Vercel
  // images: {
  //   unoptimized: true,
  // },
  images: {
    loader: "akamai",
    path: "/",
  },
};

export default nextConfig;
