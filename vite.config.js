import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Ensure this matches the casing of your repo exactly
  base: '/BreakOut/',
  build: {
    outDir: 'dist',
    // Removing manualChunks/assetsDir overrides to let Vite use defaults
    sourcemap: false, // Set to false for production to speed up build
  }
})