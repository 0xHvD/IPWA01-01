<template>
  <v-app :dir="isRtl ? 'rtl' : 'ltr'">
    <v-app-bar app color="primary" dark>
      <router-link to="/" class="title-link">
        <svgicon class="logo-image" type="mdi" :path="mdiMoleculeCo2" />
        <span class="app-title">{{ i18n.t('appTitle') }}</span>
      </router-link>

      <v-spacer />

      <!-- Desktop-Menü -->
      <v-toolbar-items class="d-none d-md-flex nav-group">
        <v-switch
          v-model="isRtl"
          inset
          class="switch"
          :label="isRtl ? 'RTL' : 'LTR'"
        />
        <v-btn text to="/" class="nav-btn">{{ i18n.t('menu.home') }}</v-btn>
        <v-btn text to="/about" class="nav-btn">{{
          i18n.t('menu.about')
        }}</v-btn>

        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn icon v-bind="props" class="globe-btn">
              <img
                :src="currentGlobeIcon"
                alt="Sprache wählen"
                class="globe-image"
              />
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              v-for="lang in languages"
              :key="lang.value"
              @click="changeLanguage(lang.value)"
            >
              <v-list-item-title>{{ lang.label }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>

      <!-- Mobile Hamburger -->
      <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer" />
    </v-app-bar>

    <!-- Mobile Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      :location="isRtl ? 'right' : 'left'"
      color="primary"
      dark
    >
      <v-list>
        <v-list-item to="/" @click="drawer = false">{{
          i18n.t('menu.home')
        }}</v-list-item>
        <v-list-item to="/about" @click="drawer = false">{{
          i18n.t('menu.about')
        }}</v-list-item>

        <v-divider class="my-2" />

        <v-list-subheader class="language-subheader">{{
          i18n.t('menu.language')
        }}</v-list-subheader>
        <v-list-item
          v-for="lang in languages"
          :key="lang.value"
          @click="
            changeLanguage(lang.value);
            drawer = false
          "
        >
          <v-list-item-title>{{ lang.label }}</v-list-item-title>
        </v-list-item>

        <v-divider class="my-2" />

        <v-list-item>
          <v-switch v-model="isRtl" inset :label="isRtl ? 'RTL' : 'LTR'" />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
      <Footer />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'
import Logo from '@/components/Logo.vue'
import Footer from '@/components/Footer.vue'
import globeColor from '@/assets/Globe_icon.png'
import globeWhite from '@/assets/Globe_icon-white.png'

const i18n = useI18n({ useScope: 'global' })
const theme = useTheme()

// RTL/LTR Steuerung
const isRtl = ref(false)
watch(
  isRtl,
  (rtl) => {
    document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr')
  },
  { immediate: true },
)

// Drawer Zustand
const drawer = ref(false)

// Sprachen
const languages = [
  { label: 'Deutsch', value: 'de' },
  { label: 'English', value: 'en' },
]

const changeLanguage = (lang: string) => {
  i18n.locale.value = lang
}
const toggleDirection = () => {
  isRtl.value = !isRtl.value
}

const currentGlobeIcon = computed(() =>
  theme.global.name.value === 'light' ? globeWhite : globeColor,
)

import { mdiMoleculeCo2 } from '@mdi/js'

import svgicon from '@jamescoyle/vue-icon'
</script>

<style scoped>
.v-app {
  margin: 0px 8px;
}

.title-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.app-title {
  margin: 8px;
  font-size: 1.25rem;
  font-weight: 500;
}

.nav-btn {
  color: inherit;
}

.globe-image {
  width: 24px;
  height: 24px;
}

.switch {
  display: flex;
  margin: 0 12px;
}

.d-none {
  display: none !important;
}

.d-md-flex {
  display: flex !important;
}

.d-md-none {
  display: none !important;
}

.v-toolbar {
  padding: 0 8px;
}

@media (max-width: 959px) {
  .nav-group,
  html[dir='rtl'] .nav-group {
    display: none !important;
  }

  .d-md-none {
    display: block !important;
  }

  .d-md-flex {
    display: none !important;
  }
}
@media (min-width: 959px) {
  .v-navigation-drawer {
    display: block !important;
  }

  .d-md-none {
    display: none !important;
  }

  .d-md-flex {
    display: blflexock !important;
  }
}

.logo-image {
  width: 40px;
  height: 40px;
}

.language-subheader {
  color: var(--v-theme-on-surface);
}
</style>
