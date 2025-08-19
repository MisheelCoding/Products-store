import type { RouteRecordRaw } from 'vue-router'
import homePage from '@/pages/site/HomePage.vue'

export const siteRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: homePage,
    meta: { title: 'Home' },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/site/ProfilePage.vue'),
    meta: { title: 'Profile' },
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('@/pages/site/FavoritePage.vue'),
    meta: { title: 'Favorites' },
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/pages/site/CartPage.vue'),
    meta: { title: 'Cart' },
  },
  {
    path: '/products/:id',
    name: 'category',
    component: () => import('@/pages/site/CategoryPage.vue'),
    props: true,
    meta: { title: 'Category' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/site/AboutPage.vue'),
    meta: { title: 'About' },
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/pages/site/BlogPage.vue'),
    meta: { title: 'Blog' },
  },
  {
    path: '/delivery',
    name: 'delivery',
    component: () => import('@/pages/site/DeliveryPage.vue'),
    meta: { title: 'Delivery' },
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('@/pages/site/FaqPage.vue'),
    meta: { title: 'FAQ' },
  },
  {
    path: '/farmers',
    name: 'farmers',
    component: () => import('@/pages/site/FarmersPage.vue'),
    meta: { title: 'Farmers' },
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import('@/pages/site/PaymentPage.vue'),
    meta: { title: 'Payment' },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('@/pages/site/PrivacyPage.vue'),
    meta: { title: 'Privacy' },
  },
  {
    path: '/quality',
    name: 'quality',
    component: () => import('@/pages/site/QualityPage.vue'),
    meta: { title: 'Quality' },
  },
  {
    path: '/returns',
    name: 'returns',
    component: () => import('@/pages/site/ReturnsPage.vue'),
    meta: { title: 'Returns' },
  },
  {
    path: '/terms',
    name: 'terms',
    component: () => import('@/pages/site/TermsPage.vue'),
    meta: { title: 'Terms' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/site/NotFoundPage.vue'),
    meta: { title: 'Not Found' },
  },
]
