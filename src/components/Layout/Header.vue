<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title class="me-5">
      <Logo /> <!-- Deine Logo-Komponente oder Inline-SVG -->
      CO₂-Dashboard
    </v-toolbar-title>
    <v-spacer />
    <v-btn text to="/">Home</v-btn>
    <v-btn text to="/data">Daten</v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
// Wenn du noch keine Logo-Komponente hast, importiere hier:
// import Logo from '@/components/Logo.vue'
</script>

<style scoped>
/* Bei Bedarf feine Anpassungen */
</style>
