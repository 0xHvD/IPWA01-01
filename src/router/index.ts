// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import Impressum      from '@/views/Impressum.vue'
import Datenschutz    from '@/views/Datenschutz.vue'
import UeberView from '@/views/Ueber.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: UeberView,
  },
  {
    path: '/impressum',
    name: 'Impressum',
    component: Impressum,
  },
  {
    path: '/datenschutz',
    name: 'Datenschutz',
    component: Datenschutz,
  },
  // optional: Catch-All-Route oder 404-Page
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
