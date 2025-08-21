import axios, {
  isAxiosError, // ← NEW
  CanceledError, // ← NEW
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosRequestHeaders,
} from 'axios'
import { useAuthStore } from '@/stores/auth'
import type { AuthResponse } from '@/types/auth'

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean
}

/** ← NEW: один хелпер, чтобы везде получать человекочитаемое сообщение */
function getErrorMessage(err: unknown): string {
  if (err instanceof CanceledError) return 'Запрос отменён'
  if (isAxiosError<{ message?: string; errors?: Record<string, string[]> }>(err)) {
    const res = err.response
    // 1) сервер прислал message
    const msg = res?.data?.message
    if (msg) return msg
    // 2) иногда бывает поле errors с массивами
    const firstFieldError =
      res?.data && typeof res.data === 'object'
        ? Object.values(res.data.errors ?? {})[0]?.[0]
        : undefined
    if (firstFieldError) return firstFieldError
    // 3) статусные дефолты
    if (res?.status === 401) return 'Не авторизован'
    if (res?.status === 403) return 'Доступ запрещён'
    if (res?.status === 404) return 'Не найдено'
    if (res?.status && res.status >= 500) return 'Ошибка сервера'
    // 4) таймаут
    if (err.code === 'ECONNABORTED') return 'Истекло время ожидания запроса'
    // 5) сеть отвалилась
    if (!res) return 'Нет соединения с сервером'
    return 'Произошла ошибка'
  }
  // не axios-ошибка
  return err instanceof Error ? err.message : 'Произошла ошибка'
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5007',
  withCredentials: true,
  timeout: 10000,
})

// Request: прокидываем токен
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
  async (error: unknown) => {
    // ← тип шире (unknown)
    const store = useAuthStore()

    // сразу положим удобное сообщение в стор
    store.error = getErrorMessage(error) // ← NEW

    // дальше — только если это axios-ошибка
    if (!isAxiosError(error)) {
      return Promise.reject(error)
    }

    const original = error.config as CustomAxiosRequestConfig | undefined
    if (!original) return Promise.reject(error)

    const status = error.response?.status
    const url = original.url ?? ''
    const isAuthPath =
      url.includes('/api/auth/refresh') ||
      url.includes('/api/auth/login') ||
      url.includes('/api/auth/logout')

    // авто-refresh по 401
    if (status === 401 && !original._retry && !isAuthPath) {
      original._retry = true
      try {
        await doRefresh()
        return api(original)
      } catch (e) {
        // refresh не удался — чистим сессию
        store.logout()
        return Promise.reject(e)
      }
    }

    // по 403 тоже имеет смысл чистить сессию (опционально):
    // if (status === 403) store.logout()

    return Promise.reject(error)
  },
)

export default api

// import axios, {
//   AxiosError,
//   type AxiosInstance,
//   type AxiosRequestConfig,
//   type AxiosRequestHeaders,
// } from 'axios'
// import { useAuthStore } from '@/stores/auth'
// import type { AuthResponse } from '@/types/auth'

// // расширим конфиг, чтобы хранить флаг _retry
// interface CustomAxiosRequestConfig extends AxiosRequestConfig {
//   _retry?: boolean
// }

// const api: AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5007',
//   withCredentials: true, // refresh-cookie будет уходить сама
//   timeout: 10000,
// })
// // Request interceptor: добавляем access в Authorization

// api.interceptors.request.use((config) => {
//   const store = useAuthStore()
//   if (store.accessToken) {
//     ;(config.headers as AxiosRequestHeaders)['Authorization'] = `Bearer ${store.accessToken}`
//   }
//   return config
// })

// // ---- refresh lock ----
// let refreshPromise: Promise<string> | null = null

// async function doRefresh(): Promise<string> {
//   if (!refreshPromise) {
//     refreshPromise = api
//       .post<AuthResponse>('/api/auth/refresh')
//       .then(({ data }) => {
//         const store = useAuthStore()
//         store.setAccessToken(data.accessToken)
//         store.setUser(data.user)
//         return data.accessToken
//       })
//       .finally(() => {
//         refreshPromise = null
//       })
//   }
//   return refreshPromise
// }

// // Response interceptor
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

// export default api
