export type ApiBaseUrl = 'admin' | 'public' | 'courier'

export const API_URLS: Record<ApiBaseUrl, string> = {
  admin: 'api/admin',
  courier: 'api/courier',
  public: 'api/public',
} as const

export const API_ENDPOINTS = {
  products: '/products',
  orders: '/orders',
  users: '/users',
  stores: '/stores',
  auth: '/auth',
} as const

export type ApiEndpointKey = keyof typeof API_ENDPOINTS
