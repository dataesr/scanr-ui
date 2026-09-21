import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Keep DSFR icons and fonts as files instead of inlining them as data URIs in the CSS
const dsfrStaysOnDisk = (filePath: string): boolean | undefined =>
  filePath.includes('@gouvfr/dsfr') ? false : undefined

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: dsfrStaysOnDisk,
  },
})
