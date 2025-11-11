import { type User } from '@/types/auth'

// класс для статуса блокировки
export const banStatusClass = (user: User) => {
  if (user.roles.includes('SUPER_ADMIN')) return 'text-gray-500' // например, нельзя менять
  return user.isBanned ? 'text-red-500' : 'text-green-500'
}

// текст статуса блокировки
export const banStatusText = (user: User) => {
  if (user.roles.includes('SUPER_ADMIN')) return 'Нельзя заблокировать'
  return user.isBanned ? 'Заблокирован' : 'Незаблокирован'
}

// класс для верификации
export const verifiedClass = (user: User) => (user.verified ? 'text-green-500' : 'text-red-500')
