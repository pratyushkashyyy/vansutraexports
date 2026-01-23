import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    hmr: {
      host: '1e2d5dba546f.ngrok-free.app',
      protocol: 'wss'
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/sitemap.xml': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
