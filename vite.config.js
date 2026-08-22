import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GrüeziGo — configurado para PWA-ready build (manifest/service worker se añaden en fase 2)
// base: en producción se sirve desde https://<usuario>.github.io/Gruezigo/, así
// que las rutas de assets deben ir bajo ese subdirectorio. En local (npm run
// dev) se mantiene en la raíz para no romper http://localhost:5180.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/Gruezigo/' : '/',
  server: {
    port: 5180,
    strictPort: true,
    open: true,
  },
}))
