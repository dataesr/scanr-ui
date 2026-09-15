import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { analyzer } from 'vite-bundle-analyzer'

// Keep DSFR assets as files instead of data URIs. Note: @dataesr/dsfr-plus ships its own style.css
// with the icons already inlined at its build time, so this only affects assets resolved from @gouvfr/dsfr.
const dsfrStaysOnDisk = (filePath: string): boolean | undefined =>
  filePath.includes('@gouvfr/dsfr') ? false : undefined

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), analyzer()],
  build: {
    assetsInlineLimit: dsfrStaysOnDisk,
  },
})
