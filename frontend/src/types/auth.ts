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
  readonly id: string
  username: string
  email: string

  roles: string[]
  favorite: string[] //id храниться продуктов
  verified: boolean
  isBanned: boolean
  region: string
  phone: string | null
  addresses: Address[] //
  createdAt: string // ISO-дата
  updatedAt: string // ISO-дата
  __v: number
}

export interface AuthResponse {
  accessToken: string
  user: User
}
