<template>
  <div class="menu-container" :dir="dir">
    <!-- Home-Link -->
    <router-link to="/" class="menu-link">
      <v-btn text class="mx-2">{{ t('menu.home') }}</v-btn>
    </router-link>

    <!-- Data-Link -->
    <router-link to="/data" class="menu-link">
      <v-btn text class="mx-2">{{ t('menu.data') }}</v-btn>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

// Schreibrichtung
const dir = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'))

// Schreibrichtung auf <html> setzen
watch(
  dir,
  newDir => document.documentElement.setAttribute('dir', newDir),
  { immediate: true }
)
</script>

<style scoped>
.menu-container {
  display: flex;
  align-items: center;
}
.mx-2 {
  margin: 0 8px;
}
.menu-link {
  text-decoration: none;
  color: inherit;
}
</style>
