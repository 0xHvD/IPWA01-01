// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // macht @ zu deinem src-Ordner
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
