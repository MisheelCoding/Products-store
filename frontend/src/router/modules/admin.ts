import type { AppRouteRecordRaw } from '@/types/routeTypes'

export const admingRoutes: AppRouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/pages/panel/admin/AdminLayout.vue'),
    meta: {
      title: 'admin',
      roles: ['ADMIN', 'SUPER_ADMIN'],
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard', //  сразу редиректим на dashboard
      },
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('@/pages/panel/admin/AdminDashboard.vue'),
        meta: {
          title: 'admin',
          roles: ['ADMIN', 'SUPER_ADMIN'],
          requiresAuth: true,
        },
      },
      {
        path: 'orders',
        name: 'admin-orders',
        component: () => import('@/pages/panel/admin/AdminOrders.vue'),
        meta: {
          title: 'admin',
          roles: ['ADMIN', 'SUPER_ADMIN'],
          requiresAuth: true,
        },
      },
      {
        path: 'users',
        name: 'admin-users',
        component: () => import('@/pages/panel/admin/AdminUsers.vue'),
        meta: {
          title: 'admin',
          roles: ['ADMIN', 'SUPER_ADMIN'],
          requiresAuth: true,
        },
      },
      {
        path: 'chats',
        name: 'admin-chats',
        component: () => import('@/pages/panel/admin/AdminChats.vue'),
        meta: {
          title: 'admin',
          roles: ['ADMIN', 'SUPER_ADMIN'],
          requiresAuth: true,
        },
      },
    ],
  },
]
