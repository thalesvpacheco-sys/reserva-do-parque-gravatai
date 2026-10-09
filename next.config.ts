import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true }, // imagens já vão em webp no tamanho certo
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1"], // preview do Codespaces
};

export default nextConfig;
