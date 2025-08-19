import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosRequestHeaders,
} from 'axios'
import { useAuthStore } from '@/stores/auth'
import type { AuthResponse } from '@/types/auth'

// расширим конфиг, чтобы хранить флаг _retry
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5007',
  withCredentials: true, // refresh-cookie будет уходить сама
  timeout: 10000,
})
// Request interceptor: добавляем access в Authorization

api.interceptors.request.use((config) => {
  const store = useAuthStore()
  if (store.accessToken) {
    ;(config.headers as AxiosRequestHeaders)['Authorization'] = `Bearer ${store.accessToken}`
  }
  return config
})

// ---- refresh lock ----
let refreshPromise: Promise<string> | null = null

async function doRefresh(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = api
      .post<AuthResponse>('/api/auth/refresh')
      .then(({ data }) => {
        const store = useAuthStore()
        store.setAccessToken(data.accessToken)
        store.setUser(data.user)
        return data.accessToken
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as CustomAxiosRequestConfig | undefined
    if (!original) return Promise.reject(error)

    const status = error.response?.status
    const url = original.url ?? ''
    const isAuthPath =
      url.includes('/api/auth/refresh') ||
      url.includes('/api/auth/login') ||
      url.includes('/api/auth/logout')

    if (status === 401 && !original._retry && !isAuthPath) {
      original._retry = true

      try {
        await doRefresh()
        return api(original)
      } catch (e) {
        const store = useAuthStore()
        store.logout()
        return Promise.reject(e)
      }
    }
    return Promise.reject(error)
  },
)
// api.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     const original = error.config as CustomAxiosRequestConfig | undefined
//     if (!original) return Promise.reject(error)

//     const status = error.response?.status
//     const url = original.url ?? ''
//     const isAuthPath =
//       url.includes('/api/auth/refresh') ||
//       url.includes('/api/auth/login') ||
//       url.includes('/api/auth/logout')

//     if (status === 401 && !original._retry && !isAuthPath) {
//       original._retry = true
//       try {
//         await doRefresh()
//         return api(original)
//       } catch (e) {
//         const store = useAuthStore()
//         store.logout()
//         return Promise.reject(e)
//       }
//     }

//     return Promise.reject(error)
//   },
// )

export default api
