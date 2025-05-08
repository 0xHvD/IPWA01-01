<!-- src/views/Impressum.vue -->
<template>
  <v-container class="mt-12">
    <h2>{{ t('imprint') }}</h2>
    <p>{{ t('imprintContent') }}</p>
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
</script>
