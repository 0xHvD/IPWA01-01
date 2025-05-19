import { createI18n } from 'vue-i18n'
import de from '@/locales/de.json'
import en from '@/locales/en.json'

export default createI18n({
  legacy: false, // Composition API
  locale: navigator.language.split('-')[0] || 'de',
  fallbackLocale: 'en',
  globalInjection: true, // ermöglicht $t überall
  messages: { de, en },
})
