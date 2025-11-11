import type { User } from '@/types/auth'
import type { PaginatedResponse } from './common/api'

export type AdminPage = 'dashboard' | 'orders' | 'users' | 'chats'

export const ADMIN_PAGE_TITLES: Record<AdminPage, string> = {
  dashboard: 'Панель управление',
  orders: 'Заказы',
  users: 'Пользователи',
  chats: 'Чаты',
} as const

export type AdminIcon =
  | 'stash:dashboard-light'
  | 'material-symbols-light:orders-outline-rounded'
  | 'mage:users'
  | 'ph:chats-circle-thin'

export interface PanelLink {
  title: AdminPage
  icon: AdminIcon
  link: `/admin/${AdminPage}`
  badge?: number
}

export type UsersResponse = PaginatedResponse<User>
