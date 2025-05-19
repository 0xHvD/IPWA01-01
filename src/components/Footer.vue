<template>
  <v-footer app padless>
    <v-col class="text-center py-3">
      © {{ new Date().getFullYear() }} Klima-Non-Profit •
      <RouterLink to="/impressum">{{ t('imprint') }}</RouterLink> •
      <RouterLink to="/datenschutz">{{ t('privacy') }}</RouterLink>
    </v-col>
  </v-footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

// i18n im globalen Scope nutzen
const { t } = useI18n({ useScope: 'global' })
</script>

<style scoped></style>
