import { type RouteRecordRaw } from 'vue-router'

export const admingRoutes: RouteRecordRaw[] = [
  {
    path: 'admin',
    name: 'admin',
    component: () => import('@/pages/panel/admin/AdminDashboard.vue'),
    meta: {
      title: 'admin',
      roles: ['ADMIN', 'SUPER_ADMIN'],
      requiresAuth: true,
    },
  },
]
