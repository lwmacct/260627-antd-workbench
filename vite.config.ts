import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const peerExternals = ["@ant-design/icons", "antd", "react", "react-dom"];

function isPeerExternal(id: string) {
  return peerExternals.some((peer) => id === peer || id.startsWith(`${peer}/`));
}

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    lib: {
      entry: {
        global: "src/styles/global.css",
        index: "src/index.ts",
        navigation: "src/navigation.ts",
        provider: "src/provider.ts",
        security: "src/security.ts",
        styles: "src/styles/index.css",
        theme: "src/theme.ts",
      },
      formats: ["es"],
      fileName: (_, entryName) => `${entryName}.js`,
    },
    rolldownOptions: {
      external: isPeerExternal,
    },
  },
});
