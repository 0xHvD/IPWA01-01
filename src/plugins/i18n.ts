// src/plugins/i18n.ts
import { createI18n } from 'vue-i18n'

// Lade deine Übersetzungsdateien
import en from '@/locales/en.json'
import ar from '@/locales/ar.json'
import de from '@/locales/de.json'

const messages = { en, ar, de }

interface MessageSchema {
    menu: {
      home: string
      data: string
    }
  }
  
  export default createI18n<[MessageSchema], 'en' | 'ar' | 'de'>({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages,
  })
  