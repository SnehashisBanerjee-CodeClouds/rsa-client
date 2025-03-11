/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "staging-admin.restroomstallsandall.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
