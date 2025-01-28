import path from "path";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@services": path.resolve(__dirname, "../"), // Apunta al directorio raíz de "services"
    };
    return config;
  },
};

export default nextConfig;