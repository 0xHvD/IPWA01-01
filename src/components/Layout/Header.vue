<template>
  <v-app-bar app color="primary" dark :dir="currentDir">
    <!-- Logo + Title -->
    <router-link :to="{ name: 'Home' }" class="d-flex align-center title-link">
      <Logo />
      <span class="app-title">CO₂-Dashboard</span>
    </router-link>

    <v-spacer />

    <!-- 1. Globus-Icon als Sprach-Wähler -->
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn icon v-bind="props" class="globe-btn">
          <!-- src wechselt je nach Theme -->
          <img
            :src="currentGlobeIcon"
            alt="Sprache wählen"
            class="globe-image"
          />
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="lang in languages"
          :key="lang.value"
          @click="changeLocale(lang)"
        >
          <v-list-item-title>{{ lang.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Haupt-Menü -->
    <LocalMenu />
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'

import Logo from '@/components/Logo.vue'
import LocalMenu from '@/components/Layout/LocalMenu.vue'

// beide Varianten deines Globus-Icons
import globeLight from '@/assets/Globe_icon.png'
import globeDark  from '@/assets/Globe_icon-white.png'

const { locale } = useI18n()
const theme = useTheme()

// wechselt Theme, wenn OS-Einstellung ändert
function changeLocale(lang: { label: string; value: string }) {
  locale.value = lang.value
}

// Schreibrichtung
const currentDir = computed(() =>
  locale.value === 'ar' ? 'rtl' : 'ltr'
)

// berechnet, welches Icon angezeigt wird
const currentGlobeIcon = computed(() =>
  theme.global.name.value === 'dark' ? globeLight : globeDark
)

// Sprach-Optionen
const languages = [
  { label: 'Deutsch',  value: 'de' },
  { label: 'English',  value: 'en' },
  { label: 'العربية', value: 'ar' },
]
</script>

<style scoped>
.title-link {
  text-decoration: none;
  color: inherit;
}
.app-title {
  font-size: 1.25rem;
  font-weight: 500;
}
.globe-btn {
  margin-right: 8px;
  padding: 8px;
}
.globe-image {
  width: 24px;
  height: 24px;
}
</style>
