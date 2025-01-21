/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rsa-api-kappa.vercel.app",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
