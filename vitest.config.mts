import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"], // Only look for .test files
    exclude: ["**/node_modules/**", "**/e2e_tests/**"], // Explicitly ignore E2E folder
  },
});
