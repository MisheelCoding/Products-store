//www.houseofblanks.com/
//shihiko.com/products/fallen-chariot-shacket?_pos=3&_psq=jacket&_ss=e&_v=1.0
// stores/auth.ts
import { defineStore } from 'pinia'
import api from '@/scripts/api'
import type { User, AuthResponseDTO } from '@/types/auth'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  //?? states
  const accessToken = ref<string>('')
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref('')

  // ??getters
  const isAuthenticated = computed(() => !!accessToken.value && !!user.value)
  const checkRole = (role: string) => user.value?.roles.includes(role) ?? false

  //?? actions

  // *** Записать ключ в state
  function setAccessToken(token: string) {
    accessToken.value = token
  }
  // *** Записать пользовтеля в state
  function setUser(u: User) {
    user.value = u
  }

  // *** logout
  async function logout() {
    try {
      await api.post('/api/auth/logout', null, { withCredentials: true })
    } catch (e) {
      console.error(e)
    } finally {
      accessToken.value = ''
      user.value = null
    }
  }
  // *** login
  async function login(username: string, password: string): Promise<void> {
    loading.value = true
    error.value = ''

    try {
      const { data } = await api.post<AuthResponseDTO>('api/auth/login', {
        username,
        password,
      })
      setAccessToken(data.accessToken)
      setUser(data.user)
      await router.push({ name: 'profile' })
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  // *** refister
  async function register(username: string, email: string, password: string) {
    loading.value = true
    error.value = ''
    try {
      const { data } = await api.post('api/auth/register', {
        username,
        password,
        email,
      })
      setAccessToken(data.accessToken)
      setUser(data.user)
      await router.push({ name: 'profile' })
    } catch (e) {
      console.log(e)
    } finally {
      loading.value = false
    }
  }
  // ***  восстановление из refresh-cookie при обновлении страницы

  async function tryRestore(): Promise<void> {
    try {
      const { data } = await api.post<AuthResponseDTO>('api/auth/refresh', null, {
        withCredentials: true,
      })
      setAccessToken(data.accessToken)
      setUser(data.user)
    } catch (e) {
      console.log(e)
      await logout()
    } finally {
      loading.value = false
    }
  }

  return {
    // state
    accessToken,
    user,
    loading,
    error,
    // getters
    isAuthenticated,
    checkRole,
    // actions
    setAccessToken,
    setUser,
    logout,
    login,
    register,
    tryRestore,
  }
})

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     accessToken: '' as string,
//     user: null as User | null,
//     loading: false,
//     error: '' as string,
//   }),

//   getters: {
//     isAuthenticated: (state): boolean => !!state.accessToken && !!state.user,
//     checkRole: (state) => {
//       return (role: string) => {
//         return state.user?.roles?.includes(role) ?? false
//       }
//     },
//   },

//   actions: {
//     setAccessToken(token: string) {
//       this.accessToken = token
//     },
//     setUser(user: User) {
//       this.user = user
//     },
//     async logout() {
//       try {
//         await api.post('/api/auth/logout', null, { withCredentials: true })
//       } catch (_) {
//         console.log(_)
//       } finally {
//         this.accessToken = ''
//         this.user = null
//       }
//     },

//     async login(username: string, password: string): Promise<void> {
//       this.loading = true
//       this.error = ''
//       try {
//         const { data } = await api.post<AuthResponseDTO>('/api/auth/login', { username, password })
//         this.setAccessToken(data.accessToken)
//         this.setUser(data.user)
//         router.push({ name: 'profile' })
//       } catch (err) {
//         this.accessToken = ''
//         this.user = null
//         throw err
//       } finally {
//         this.loading = false
//       }
//     },

//     async register(username: string, email: string, password: string): Promise<void> {
//       this.loading = true
//       this.error = ''
//       try {
//         const { data } = await api.post<AuthResponseDTO>
//       } catch (e) {}
//     },
//     // восстановление из refresh-cookie при обновлений страницы
//     async tryRestore(): Promise<void> {
//       try {
//         const { data } = await api.post<AuthResponseDTO>('/api/auth/refresh', null, {
//           withCredentials: true,
//         })
//         this.setAccessToken(data.accessToken)
//         this.setUser(data.user)
//       } catch {
//         // refresh-cookie нет или протух  остаёмся гостем
//         this.logout()
//       }
//     },
//   },
// })
