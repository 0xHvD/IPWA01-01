import { createApp } from 'vue'
import App from './App.vue'

import i18n from './plugins/i18n'

// Styles
import './styles/main.scss'        // Globales SCSS (inkl. Vuetify-Styles)
import './style.css'              // Zusätzliche CSS hast

// Plugins
import router from './router'
import vuetify from './plugins/vuetify'

const app = createApp(App)

app
  .use(router)     // zuerst Router registrieren
  .use(vuetify)    // dann Vuetify registrieren
  .use(i18n)
  .mount('#app')

console.log('App mounted')