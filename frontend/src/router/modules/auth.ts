import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth/login',
    component: () => import('@/pages/auth/AuthLogin.vue'),
    name: 'login',
    meta: { title: 'login' },
  },
  {
    path: '/auth/register',
    component: () => import('@/pages/auth/AuthRegister.vue'),
    name: 'register',
    meta: { title: 'register' },
  },
  {
    path: '/auth/verify-email',
    component: () => import('@/pages/auth/AuthVerifyEmail.vue'),
    name: 'verify-email',
  },
]
