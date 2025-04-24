// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import DataTableView from '@/views/DataTableView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/data',
    name: 'Emissions',
    component: DataTableView,
  },
]

const router = createRouter({
  history: createWebHistory(), // nutzt die HTML5-History-API
  routes,
})

export default router
