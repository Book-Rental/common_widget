import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.widget.tsx",
      name: "CommonWidget",
      formats: ["iife"],
      fileName: () => "common-widget.js",
    },
  },
});