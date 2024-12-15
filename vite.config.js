import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build", // Specify the output directory for the built files
    emptyOutDir: true, // Clear the output directory before building
    // You may add other build options as needed
  },
});
