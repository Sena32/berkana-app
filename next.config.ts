import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["https://berkana-api-site.onrender.com"], // Adicione aqui o domínio da sua API de imagens
  }
};

export default nextConfig;
