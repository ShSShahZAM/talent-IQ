import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or your framework plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // forward API calls starting with /api to backend:3000
      '/api': {
        target: 'https://talent-iq-backend-jk5a.onrender.com',
        changeOrigin: true,
        secure: false,
      },
      // if your backend uses /books,/health without /api prefix,
      // add them or proxy all unknown requests accordingly
    }
  }
})
