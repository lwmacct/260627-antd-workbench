import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const workbenchName = "@lwmacct/260627-antd-workbench";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: `${workbenchName}/global.css`,
        replacement: resolve(import.meta.dirname, "src/styles/global.css"),
      },
      {
        find: `${workbenchName}/styles.css`,
        replacement: resolve(import.meta.dirname, "src/styles/index.css"),
      },
      {
        find: `${workbenchName}/security`,
        replacement: resolve(import.meta.dirname, "src/security.ts"),
      },
      {
        find: workbenchName,
        replacement: resolve(import.meta.dirname, "src/index.ts"),
      },
    ],
  },
  root: "example",
  build: {
    chunkSizeWarningLimit: 10240,
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
