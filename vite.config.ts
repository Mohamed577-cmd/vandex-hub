import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Pure SPA build: TanStack Start emits a single index.html shell that
// hydrates client-side. Output goes to dist/client and works on any
// static host (Cloudflare Pages, Vercel, Netlify, GitHub Pages).
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    spa: {
      enabled: true,
      prerender: { outputPath: "/index.html" },
    },
  },
});
