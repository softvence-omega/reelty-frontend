import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    origin: "http://0.0.0.0:3000",
    allowedHosts: [
      "api.reelty.com.au",
      "reelty.com.au",
      "www.reelty.com.au",
      "localhost",
    ],
  },
  preview: {
    port: 3000,
    strictPort: true,
    allowedHosts: [
      "api.reelty.com.au",
      "reelty.com.au",
      "www.reelty.com.au",
      "localhost",
    ],
  },
});



// import path from "path";
// import tailwindcss from "@tailwindcss/vite";
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//  base: "/",
//  plugins: [react(),tailwindcss()],
//    resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
//  preview: {
//   port: 8080,
//   strictPort: true,
//  },
//  server: {
//   port: 8080,
//   strictPort: true,
//   host: true,
//   origin: "http://0.0.0.0:8080",
//  },
// });