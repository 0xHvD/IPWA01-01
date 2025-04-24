<template>
  <div class="menu-container" :dir="dir">
    <v-btn text to="/" class="mx-2">{{ t('menu.home') }}</v-btn>
    <v-btn text to="/data" class="mx-2">{{ t('menu.data') }}</v-btn>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const dir = computed(() => (locale.value === 'ar' ? 'rtl' : 'ltr'))

watch(
  dir,
  newDir => document.documentElement.setAttribute('dir', newDir),
  { immediate: true },
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
</style>
