import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: "src",
      insertTypesEntry: true,
    }),
  ],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: {
        global: "src/styles/global.css",
        index: "src/index.ts",
        styles: "src/styles/styles.css",
      },
      formats: ["es"],
      fileName: (_, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "antd",
        "@ant-design/icons",
      ],
    },
  },
});
