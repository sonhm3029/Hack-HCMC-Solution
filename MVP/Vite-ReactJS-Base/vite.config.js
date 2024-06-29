import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import fs from "fs/promises";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
  },
  // define: {
  //   global: "globalThis",
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@components": `${path.resolve(__dirname, "./src/components")}`,
      "@assets": `${path.resolve(__dirname, "./src/assets")}`,
      "@images": `${path.resolve(__dirname, "./src/assets/images")}`,
      "@data-access": `${path.resolve(__dirname, "./src/data-access")}`,
      "@utils": `${path.resolve(__dirname, "./src/utils")}`,
      "@redux": `${path.resolve(__dirname, "./src/redux")}`,
      "@container": `${path.resolve(__dirname, "./src/container")}`,
      "@constants": `${path.resolve(__dirname, "./src/constants")}`,
      "@hooks": `${path.resolve(__dirname, "./src/hooks")}`,
      "@routes": `${path.resolve(__dirname, "./src/routes")}`,
      "@pages": `${path.resolve(__dirname, "./src/container/pages")}`,
      "@config": `${path.resolve(__dirname, "./src/config")}`,
    },
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    // loader: "tsx",
    // include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: "jsx",
              contents: await fs.readFile(args.path, "utf8"),
            }));
          },
        },
      ],
    },
  },
});
