import type { AuthResponseDTO, User } from '@/types/auth'
import axios, { AxiosError } from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: '' as string,
    user: null as User | null,
    loading: false as boolean,
    error: '' as string,
  }),

  getters: {
    isAuthenticated: (s): boolean => !!s.accessToken && !!s.user,
    isAdmin: (s): boolean => !!s.user?.roles?.includes('ADMIN'),
    isSuPerAdmin: (s): boolean => !!s.user?.roles?.includes('SUPER_ADMIN'),
  },

  actions: {
    setUser(user: User) {
      this.user = user
    },
    setAccessToken(token: string) {
      this.accessToken = token
    },
    async login(username: string, password: string) {
      this.loading = true
      this.error = ''

      try {
        const { data } = await axios.post<AuthResponseDTO>('/api/auth/login', {
          username,
          password,
        })
        this.setAccessToken(data.accessToken)
        this.setUser(data.user)
      } catch (e) {
        const error = e as AxiosError<{ message?: string }>
        this.error = error.response?.data?.message ?? 'Ошибка входа '
        this.accessToken = ''
        this.user = null
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
