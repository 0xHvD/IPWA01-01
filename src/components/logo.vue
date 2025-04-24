<!-- src/components/Logo.vue -->
<template>
  <img :src="logo" alt="Logo" class="logo-image" />
</template>

<script setup lang="ts">
// Relativer Pfad zu src/assets/vue.svg
import logo from '../assets/vue.svg'
</script>

// Logo formatieren
<style scoped>
.logo-image {
  height: 40px;
  width: auto;
  margin-left: 20px;
  margin-right: 10px;
}
</style>
