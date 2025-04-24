<script setup lang="ts">
import Header from './components/Layout/Header.vue'
import Footer from './components/Layout/Footer.vue'
</script>

<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<style>
/* Aktuell keine globale Styles. */
</style>
