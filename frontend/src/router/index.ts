import { createRouter, createWebHistory } from 'vue-router'
import { siteRoutes } from '@/router/modules/site'
import { authRoutes } from '@/router/modules/auth'
import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [...siteRoutes, ...authRoutes]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
