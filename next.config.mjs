/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [new URL("https://static.vecteezy.com/**")],
  },
};

export default nextConfig;
