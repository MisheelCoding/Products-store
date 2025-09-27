// types/auth.ts

export interface Address {
  _id?: string
  label: string
  addressLine: string
  city: string
  country: string
  phone: string
  isDefault: boolean
}

export interface User {
  id: string
  username: string
  email: string
  // пароль лучше не хранить на фронте, но если backend всё равно шлёт — можешь исключить
  roles: string[]
  favorite: string[] // если храните IDшники продуктов/магазинов
  verified: boolean
  isBanned: boolean
  region: string
  phone: string
  addresses: Address[] // или отдельный тип если структура сложнее
  createdAt: string // ISO-дата
  updatedAt: string // ISO-дата
  __v: number
}

export interface AuthResponse {
  accessToken: string
  user: User
}
