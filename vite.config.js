import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GrüeziGo — configurado para PWA-ready build (manifest/service worker se añaden en fase 2)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
    strictPort: true,
    open: true,
  },
})
