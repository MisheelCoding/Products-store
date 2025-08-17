import { createRouter, createWebHistory } from 'vue-router'
import homePage from '@/pages/site/HomePage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: homePage,
    },
    {
      name: 'profile',
      path: '/profile',
      component: import('@/pages/site/ProfilePage.vue'),
    },
    {
      name: 'favorite',
      path: '/favorite',
      component: import('@/pages/site/FavoritePage.vue'),
    },
    {
      name: 'cart',
      path: '/cart',
      component: import('@/pages/site/CartPage.vue'),
    },
  ],
})

export default router
