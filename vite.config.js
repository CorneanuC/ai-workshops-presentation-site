import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
    open: false,
    allowedHosts: ['seahorse-app-fkis4.ondigitalocean.app', 'www.workshops-ai.eu', 'workshops-ai.eu'],
  },
})
