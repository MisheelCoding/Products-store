export type AdminPage = 'dashboard' | 'orders' | 'users' | 'chats'

export const ADMIN_PAGE_TITLES: Record<AdminPage, string> = {
  dashboard: 'Панель управление',
  orders: 'Заказы',
  users: 'Пользователи',
  chats: 'Чаты',
} as const

export type AdminIcon =
  | 'mage:dashboard'
  | 'material-symbols-light:orders-outline-rounded'
  | 'mage:users'
  | 'ph:chats-circle-thin'

export interface PanelLink {
  title: AdminPage
  icon: AdminIcon
  link: `/admin/${AdminPage}`
  badge?: number
}
