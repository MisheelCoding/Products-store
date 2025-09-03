//www.houseofblanks.com/
//shihiko.com/products/fallen-chariot-shacket?_pos=3&_psq=jacket&_ss=e&_v=1.0
// stores/auth.ts
import { defineStore } from 'pinia'
import api from '@/scripts/api'
import type { User, AuthResponse } from '@/types/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: '' as string,
    user: null as User | null,
    loading: false,
    error: '' as string,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.accessToken && !!state.user,
  },

  actions: {
    setAccessToken(token: string) {
      this.accessToken = token
    },
    setUser(user: User) {
      this.user = user
    },
    async logout() {
      try {
        await api.post('/api/auth/logout', null, { withCredentials: true })
      } catch (_) {
        console.log(_)
      } finally {
        this.accessToken = ''
        this.user = null
      }
    },

    async login(username: string, password: string): Promise<void> {
      this.loading = true
      this.error = ''
      try {
        const { data } = await api.post<AuthResponse>('/api/auth/login', { username, password })
        this.setAccessToken(data.accessToken)
        this.setUser(data.user)
      } catch (err) {
        this.accessToken = ''
        this.user = null
        throw err
      } finally {
        this.loading = false
      }
    },

    // восстановление из refresh-cookie при обновлений страницы
    async tryRestore(): Promise<void> {
      try {
        const { data } = await api.post<AuthResponse>('/api/auth/refresh', null, {
          withCredentials: true,
        })
        this.setAccessToken(data.accessToken)
        this.setUser(data.user)
      } catch {
        // refresh-cookie нет или протух  остаёмся гостем
        this.logout()
      }
    },
  },
})
