import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Pure client-side SPA. No SSR, no server entry, no worker output.
// Build emits dist/index.html + dist/assets/* — deployable to any static host.
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
  server: {
    host: "::",
    port: 8080,
  },
});
