import type { AppRouteRecordRaw } from '@/types/routeTypes'

export const errorsRoutes: AppRouteRecordRaw[] = [
  {
    path: '/errors/404',
    name: 'Error404',
    component: () => import('@/pages/errors/NotFoundPage.vue'),
  },
  {
    path: '/errors/403',
    name: 'Error403',
    component: () => import('@/pages/errors/ForbiddenPage.vue'),
  },
  {
    path: '/errors/500',
    name: 'Error500',
    component: () => import('@/pages/errors/ServerErrorPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error404Catch',
    component: () => import('@/pages/errors/NotFoundPage.vue'),
    meta: { title: 'Not Found' },
  },
]
