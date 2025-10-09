import type { Address } from '@/types/auth'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from './auth'
import api from '@/scripts/api'

export const useProfileStore = defineStore('profile', () => {
  const auth = useAuthStore()
  const profile = computed(() => auth.user)
  const addresses = computed(() => auth.user?.addresses ?? [])

  let intervalId: ReturnType<typeof setInterval> | null = null
  const timer = ref(0)

  const isAddingAddress = ref(false)

  const avatarUrl = ref<string | null>(null)
  const avatarExpires = ref<number | null>(null)
  const isAvatarLoading = ref(false)

  let avatarIntervalId: ReturnType<typeof setInterval> | null = null

  //** загрузить аватар  */
  async function uploadAvatar(file: File) {
    if (!file) return
    isAvatarLoading.value = true
    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const { data } = await api.post('/api/user/profile/photo', formData, {
        withCredentials: true,
      })

      await fetchAvatar()
      return data
    } catch (e) {
      console.error('Ошибка при загрузке аватара:', e)
      throw e
    } finally {
      isAvatarLoading.value = false
    }
  }
  //** получить аватар  */
  async function fetchAvatar() {
    isAvatarLoading.value = true
    try {
      const { data } = await api.get('/api/user/profile/photo', { withCredentials: true })

      // Проверяем что URL валидный
      if (!data.url) {
        throw new Error('URL не получен от сервера')
      }

      avatarUrl.value = data.url
      avatarExpires.value = data.expiresAt * 1000 // сохраняем время истечения

      console.log('Avatar URL получен, истекает:', new Date(data.expiresAt * 1000))
    } catch (e) {
      console.error('Ошибка при загрузке аватара:', e)
      avatarUrl.value = null
    } finally {
      isAvatarLoading.value = false
    }
  }

  async function ensureAvatar() {
    const now = Date.now()
    // Обновляем за 30 секунд до истечения ()
    if (!avatarExpires.value || now > avatarExpires.value - 30000) {
      console.log('Обновляем URL аватара...')
      await fetchAvatar()
    }
  }

  // Увеличиваем интервал автообновления
  function startAvatarAutoRefresh() {
    if (avatarIntervalId) clearInterval(avatarIntervalId)
    avatarIntervalId = setInterval(() => ensureAvatar(), 60000) // Каждую минуту
  }

  function stopAvatarAutoRefresh() {
    if (avatarIntervalId) clearInterval(avatarIntervalId)
    avatarIntervalId = null
  }

  // ***Получить аддресса
  async function getAddresses() {
    const { data } = await api.get('api/user/addresses')
    auth.setUser({
      ...auth.user!,
      addresses: data,
    })
  }
  // *** Создать новый Адресс
  // async function createAddress(data: Address) {
  //   const tempId = `temp-${Date.now()}`
  //   const optimisticAddress: Address = { ...data, _id: tempId }

  //   auth.setUser({
  //     ...auth.user!,
  //     addresses: [...addresses.value, optimisticAddress],
  //   })
  //   console.log(`до запроса`, addresses.value)

  //   try {
  //     const { data: newAddress } = await api.post<Address>('api/user/addresses', data, {
  //       withCredentials: true,
  //     })

  //     auth.setUser({
  //       ...auth.user!,
  //       addresses: [...addresses.value.map((addr) => (addr._id === tempId ? newAddress : addr))],
  //     })
  //     // console.log(`после запроса- ${addresses.value}`)
  //     console.log(`после запроса`, addresses.value)

  //     return newAddress
  //   } catch (e) {
  //     auth.setUser({
  //       ...auth.user!,
  //       addresses: (addresses.value ?? []).filter((addr) => addr._id !== tempId),
  //     })
  //     console.error('Ошибка при создании адреса:', e)
  //     throw e
  //   }
  // }
  async function createAddress(data: Address) {
    isAddingAddress.value = true
    try {
      const { data: newAddress } = await api.post('api/user/addresses', data, {
        withCredentials: true,
      })
      auth.setUser({
        ...auth.user!,
        addresses: [...(auth.user?.addresses ?? []), newAddress],
      })
      await getAddresses()
      return newAddress
    } catch (e) {
      console.error('Ошибка при создании адреса:', e)
      throw e
    } finally {
      isAddingAddress.value = false
    }
  }

  // ***Обновить аддресс

  async function updateAddress(id: string, data: Address) {
    const address = addresses.value.find((addr) => addr._id === id)
    if (!address) return
    const oldAddress = { ...address }

    Object.assign(address, data)
    try {
      return await api.put(`api/user/addresses/${id}`, data, { withCredentials: true })
    } catch (e) {
      Object.assign(address, oldAddress)
      console.log('Ошибка при обновлении адреса:', e)
      throw e
    }
  }

  // *** Удалить
  async function deleteAddress(id: string | undefined) {
    const oldAddresses = { ...addresses.value }

    auth.setUser({
      ...auth.user!,
      addresses: addresses.value.filter((addr) => addr._id !== id),
    })
    try {
      await api.delete(`api/user/addresses/${id}`, { withCredentials: true })
    } catch (e) {
      auth.setUser({
        ...auth.user!,
        addresses: oldAddresses,
      })
      console.log('Ошибка при Удалении адреса:', e)
      throw e
    }
  }

  // *** сохранить номер

  async function saveNumber(data: string) {
    const oldNumber = data
    auth.setUser({
      ...auth.user!,
      phone: data,
    })
    try {
      await api.put('api/user/phone', { phone: data }, { withCredentials: true })
    } catch (e) {
      auth.setUser({
        ...auth.user!,
        phone: oldNumber,
      })
      console.log('Ошибка сохраниний номера')
      throw e
    }
  }

  // *** удалить номер
  async function deleteNumber() {
    const oldNumber = auth.user?.phone
    auth.setUser({
      ...auth.user!,
      phone: null,
    })
    try {
      await api.delete('api/user/phone', { withCredentials: true })
    } catch (e) {
      auth.setUser({
        ...auth.user!,
        phone: oldNumber ?? null,
      })
      console.log('Ошибка удалений номера')
      throw e
    }
  }

  // ***
  function startTimer(seconds: number) {
    timer.value = seconds
    if (intervalId) clearInterval(intervalId)
    intervalId = setInterval(() => {
      if (timer.value > 0) {
        timer.value--
      } else {
        clearInterval(intervalId!)
        intervalId = null
      }
    }, 1000)
  }

  return {
    // *** states
    profile,
    addresses,
    isAddingAddress,

    timer,
    intervalId,

    // *** avatar
    avatarUrl,
    avatarExpires,
    isAvatarLoading,

    // **methods
    getAddresses,
    updateAddress,
    deleteAddress,
    createAddress,

    saveNumber,
    deleteNumber,
    startTimer,

    // avatar methods
    fetchAvatar,
    ensureAvatar,
    startAvatarAutoRefresh,
    stopAvatarAutoRefresh,
    uploadAvatar,
  }
})
