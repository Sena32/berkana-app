import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "74.163.99.16"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Permitir domínios não seguros para desenvolvimento
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Configurar headers para permitir conteúdo misto
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "img-src 'self' data: http: https:;"
          }
        ],
      },
    ];
  },
};

export default nextConfig;
