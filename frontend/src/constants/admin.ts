import type { PanelLink } from '@/types/penel'

export const PANEL_ADMIN_LINKS: PanelLink[] = [
  {
    title: 'dashboard',
    link: '/admin/dashboard',
    icon: 'mage:dashboard',
  },
  {
    title: 'users',
    link: '/admin/users',
    icon: 'mage:users',
  },
  {
    title: 'orders',
    link: '/admin/orders',
    icon: 'material-symbols-light:orders-outline-rounded',
  },
  {
    title: 'chats',
    link: '/admin/chats',
    icon: 'ph:chats-circle-thin',
  },
]
