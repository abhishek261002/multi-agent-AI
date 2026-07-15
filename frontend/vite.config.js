import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        // REMOVED THE REWRITE RULE 
        // Now /api/auth/login goes to http://localhost:8001/api/auth/login
      },
    },
  },
})