import { createApp } from 'vue'
import App from './App.vue'

// Styles
import './styles/main.scss'        // Globales SCSS (inkl. Vuetify-Styles)
import './style.css'              // Zusätzliche CSS hast

// Plugins
import router from './router'
import vuetify from './plugins/vuetify'

createApp(App)
  .use(router)     // zuerst Router registrieren
  .use(vuetify)    // dann Vuetify registrieren
  .mount('#app')
