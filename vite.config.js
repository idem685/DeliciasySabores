// =============================================================================
// Configuración de Vite
// =============================================================================
// Vite es el bundler ultrarrápido para React. Como ahora es un sitio estático
// (sin backend), la configuración es mucho más simple.
// - Sin proxy (ya no hay backend al que redirigir)
// - Build optimizado para producción
// - Code splitting para mejor rendimiento en Vercel
// =============================================================================

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // Servidor de desarrollo
  server: {
    port: 5173,
  },

  // Configuración de build para producción
  build: {
    outDir: 'dist',
    // Generar source maps para depuración
    sourcemap: true,
    // Dividir el código en chunks más pequeños para mejor caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          icons: ['react-icons'],
        },
      },
    },
  },
})
