<template>
  <v-container class="mt-12">
    <h2>{{ t('privacy') }}</h2>
    <p>{{ t('privacyContent') }}</p>
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

// i18n im globalen Scope nutzen
const { t } = useI18n({ useScope: 'global' })
</script>
