import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // "cacheComponents"/"partialPrefetching" exigem runtime de servidor Node;
  // desativados para permitir exportação 100% estática (output: "export"),
  // servida por nginx tal como o site estático anterior.
  output: "export",
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
