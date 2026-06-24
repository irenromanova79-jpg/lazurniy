import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base = "/<имя-репозитория>/" для публикации на GitHub Pages.
// Поменяйте на имя своего репозитория (например "/lazurny-dashboard/").
export default defineConfig({
  plugins: [react()],
  base: "./",
});
