import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative paths for static assets
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
  //server: {
    //port: 571, // or any port like 5173, 5175, etc.
  //},
});
