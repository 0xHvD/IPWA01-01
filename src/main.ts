import { createApp } from 'vue'
import App from './App.vue'

// Styles
import 'vuetify/styles'     // Vuetify Styles
import './styles/main.scss' // Globales SCSS (inkl. Vuetify-Styles)

// Plugins
import router from './router'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'

// Fonts
import '@mdi/font/css/materialdesignicons.min.css'

const app = createApp(App)

app
  .use(router) // zuerst Router registrieren
  .use(vuetify) // dann Vuetify registrieren
  .use(i18n)
  .mount('#app')

console.log('App mounted')
