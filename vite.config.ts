import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Caminho relativo pra funcionar no GitHub Pages independente do nome do repo
  base: "./",
  plugins: [react(), tailwindcss()],
});
