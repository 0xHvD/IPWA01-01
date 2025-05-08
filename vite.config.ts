import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


export default defineConfig({
  plugins: [
    vue(),
    VueI18n({
      // Pfad zu deinen JSON-Sprachdateien
      include: new URL('./src/locales/**', import.meta.url).pathname
    })
  ],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
})
