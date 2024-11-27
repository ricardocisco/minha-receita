import { execSync } from "child_process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      execSync("npx prisma generate");
    }
    return config;
  },
};

export default nextConfig;
