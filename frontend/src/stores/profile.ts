import type { Address } from '@/types/auth'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useAuthStore } from './auth'
import api from '@/scripts/api'

export const useProfileStore = defineStore('profile', () => {
  const auth = useAuthStore()

  const profile = computed(() => auth.user)
  const addresses = computed(() => auth.user?.addresses ?? [])

  // ***Получить аддресса
  async function getAddresses() {
    const { data } = await api.get('api/user/addresses')
    auth.setUser({
      ...auth.user!,
      addresses: data,
    })
  }
  // *** Создать новый Адресс
  async function createAddress(data: Address) {
    const tempId = `temp-${Date.now()}`
    const optimisticAddress: Address = { ...data, _id: tempId }
    auth.setUser({
      ...auth.user!,
      addresses: [...(auth.user?.addresses ?? []), optimisticAddress],
    })
    try {
      const { data: newAddress } = await api.post('api/user/addresses', data, {
        withCredentials: true,
      })
      auth.setUser({
        ...auth.user!,
        addresses: [...(auth.user?.addresses ?? [])].map((addr) =>
          addr._id === tempId ? newAddress : addr,
        ),
      })

      return newAddress
    } catch (e) {
      auth.setUser({
        ...auth.user!,
        addresses: (auth.user?.addresses ?? []).filter((addr) => addr._id !== tempId),
      })
      console.error('Ошибка при создании адреса:', e)
      throw e
    }
  }
  // async function createAddress(data: Address) {
  //   try {
  //     const { data: newAddress } = await api.post('api/user/addresses', data, {
  //       withCredentials: true,
  //     })
  //     auth.setUser({
  //       ...auth.user!,
  //       addresses: [...(auth.user?.addresses ?? []), newAddress],
  //     })
  //     await getAddresses()
  //     return newAddress
  //   } catch (e) {
  //     console.error('Ошибка при создании адреса:', e)
  //     throw e
  //   }
  // }

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
    const oldAddresses = { ...addresses }

    auth.setUser({
      ...auth.user!,
      addresses: addresses.value.filter((addr) => addr._id !== id),
    })
    try {
      await api.delete(`api/user/addresses/${id}`, { withCredentials: true })
    } catch (e) {
      auth.setUser({
        ...auth.user!,
        addresses: oldAddresses.value,
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

  return {
    // *** states
    profile,
    addresses,

    // **methods
    getAddresses,
    updateAddress,
    deleteAddress,
    createAddress,

    saveNumber,
    deleteNumber,
  }
})
