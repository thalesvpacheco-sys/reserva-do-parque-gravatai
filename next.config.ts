import type { NextConfig } from "next";

/* o zip do teaser (scripts/zip-teaser.mjs) é gerado com NEXT_PUBLIC_BASE_PATH=/teaser */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  basePath,
  images: { unoptimized: true }, // imagens já vão em webp no tamanho certo
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1"], // preview do Codespaces
};

export default nextConfig;
