import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    // Add the headers here to stop Firebase popups from getting blocked by the browser
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Point this to your GATEWAY
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Strips /api so /api/auth goes to gateway /auth
      },
    },
  },
})