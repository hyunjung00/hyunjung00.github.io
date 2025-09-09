import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // Use env-driven base so GitHub Pages project sites work without hardcoding
  // For user/org site: leave VITE_BASE undefined or set to '/'
  // For project site: set VITE_BASE to '/<repo-name>/'
  base: process.env.VITE_BASE || "/",
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
