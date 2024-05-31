import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    globals: true,
    exclude: [
      ...configDefaults.exclude,
      "dist/**",
      ".idea/**",
      ".git/**",
      ".cache/**",
    ],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
