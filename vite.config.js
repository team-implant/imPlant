import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@tanstack/react-query': '@tanstack/react-query/build/lib/index.esm.js',
    },
  },
});
