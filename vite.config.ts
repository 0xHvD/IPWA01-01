import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    VueI18n({
      // Pfad zu deinen JSON-Sprachdateien
      include: path.resolve(__dirname, './src/locales/**')
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
