import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project sites are served from https://<user>.github.io/<repo>/
// so the bundle needs that sub-path as its base. Set BASE_PATH in the workflow
// (it is derived from the repository name automatically) or override locally.
const base = process.env.BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [react()],
  build: { outDir: 'dist', assetsDir: 'assets' }
})
