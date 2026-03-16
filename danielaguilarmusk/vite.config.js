import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/antigravity/danielaguilarmusk/dist/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        biografia: resolve(__dirname, 'biografia.html'),
        calendario: resolve(__dirname, 'calendario.html'),
        login: resolve(__dirname, 'admin/login.html'),
        dashboard: resolve(__dirname, 'admin/dashboard.html')
      }
    }
  }
})
