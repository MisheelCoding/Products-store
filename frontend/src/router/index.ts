import { errorsRoutes } from './modules/errors'
import { admingRoutes } from '@/router/modules/admin'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { siteRoutes } from '@/router/modules/site'
import { authRoutes } from '@/router/modules/auth'
import { globalGuard } from '@/router/guards/index'
import { restoreGuard } from '@/router/guards/restore'

const routes = [...siteRoutes, ...authRoutes, ...admingRoutes, ...errorsRoutes]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[],
})

router.beforeEach(restoreGuard)
router.beforeEach(globalGuard)

export default router
