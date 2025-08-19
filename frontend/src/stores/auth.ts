// stores/auth.ts
import { defineStore } from 'pinia'
import api from '@/scripts/api'
import type { User, AuthResponse } from '@/types/auth'
import type { AxiosError } from 'axios'

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
    logout() {
      this.accessToken = ''
      this.user = null
    },

    async login(username: string, password: string): Promise<void> {
      this.loading = true
      this.error = ''
      try {
        const { data } = await api.post<AuthResponse>('/api/auth/login', { username, password })
        this.setAccessToken(data.accessToken)
        this.setUser(data.user)
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        this.error = error.response?.data?.message ?? 'Ошибка входа'
        this.accessToken = ''
        this.user = null
        throw error
      } finally {
        this.loading = false
      }
    },

    // 🔹 Новый метод: восстановление из refresh-cookie
    async tryRestore(): Promise<void> {
      try {
        const { data } = await api.post<AuthResponse>('/api/auth/refresh')
        this.setAccessToken(data.accessToken)
        this.setUser(data.user)
      } catch {
        // refresh-cookie нет или протух → остаёмся гостем
        this.logout()
      }
    },
  },
})
