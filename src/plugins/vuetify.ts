// src/plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

// Ermittlung des initialen Themes
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

export default createVuetify({
  components,
  directives,
  theme: {
    // Setze initiales Theme
    defaultTheme: prefersDark ? 'dark' : 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#FFFFFF',
          surface: '#FFFFFF',
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
        },
      },
      dark: {
        dark: true,
        colors: {
          background: '#121212',
          surface: '#1E1E1E',
          primary: '#90CAF9',
          secondary: '#EEEEEE',
          accent: '#FF4081',
          error: '#EF5350',
        },
      },
    },
  },
})
