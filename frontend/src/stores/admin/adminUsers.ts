import { type UserRoles, type User } from '@/types/auth'
import api, { getErrorMessage } from '@/scripts/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UsersResponse } from '@/types/penel'

import { type SortValue } from '@/components/panel/admin/users/AdminUsersFilter.vue'

export const useAdminUsersStore = defineStore('adminUsers', () => {
  // ?? states

  const usersByPage = ref<Map<number, User[]>>(new Map())
  const page = ref(1)
  const limit = ref(7)
  const total = ref(0)
  const totalPages = ref(0)
  const q = ref('')
  const byrole = ref<UserRoles | ''>('')
  const sort = ref<SortValue>('createdAt_asc')
  const error = ref<string>('')

  // ***получение пользовтелей
  async function getUsers(currentPage: number) {
    if (usersByPage.value.has(currentPage)) {
      return usersByPage.value.get(currentPage)
    }
    try {
      const { data } = await api.get<UsersResponse>('api/admin/users', {
        withCredentials: true,
        params: {
          limit: limit.value,
          page: currentPage,
          q: q.value || '',
          role: byrole.value || '',
          sort: sort.value || 'createdAt_asc',
        },
      })
      // console.log(data)
      const newMap = new Map(usersByPage.value)
      newMap.set(currentPage, data.items)
      usersByPage.value = newMap

      page.value = data.page
      total.value = data.total
      totalPages.value = data.totalPages
      // console.log(usersByPage.value)
      return data.items
      // return usersByPage.value.get(currentPage)
    } catch (e) {
      getErrorMessage(e)
    }
  }

  async function refreshUsers() {
    usersByPage.value.clear()
    page.value = 1
    await getUsers(page.value)
  }

  // *** установить страницу

  function setPage(newPage: number) {
    page.value = newPage
  }
  // *** удалить пользотелей одну или несколько
  async function deleteUsers(ids: string | string[]) {
    try {
      if (Array.isArray(ids)) {
        await api.delete('api/admin/users', {
          data: { ids },
          withCredentials: true,
        })
      } else {
        await api.delete(`api/admin/users/:${ids}`, {
          data: { ids },
          withCredentials: true,
        })
      }
    } catch (e) {
      getErrorMessage(e)
    }
  }

  // ***добавить фильтр по сорт
  async function selectSort(value: unknown) {
    sort.value = value as SortValue
    await refreshUsers()
  }
  // ***добавить фильтр по ролям

  async function selectRole(value: unknown) {
    byrole.value = value as UserRoles
    await refreshUsers()
  }
  // ***добавить фильтр по поиску

  async function search(value: unknown) {
    q.value = value as string
    await refreshUsers()
  }

  // *** забанить одного или масовао
  // async function updateUsers(ids: string | string[], data: Partial<User>) {
  //   const idArray: string[] = Array.isArray(ids) ? ids : [ids]
  //   const oldMap = new Map(usersByPage.value)

  //   const updatedMap = new Map(usersByPage.value)
  //   for (const [pageNum, users] of updatedMap) {
  //     updatedMap.set(
  //       pageNum,
  //       users.map((u) => {
  //         return idArray.includes(u.id) ? { ...u, ...data } : u
  //       }),
  //     )
  //   }
  //   try {
  //     await api.patch('api/admin/users', { ids, data }, { withCredentials: true })
  //   } catch (e) {
  //     error.value = getErrorMessage(e)
  //     usersByPage.value = oldMap
  //   }
  // }
  async function updateUsers(ids: string | string[], data: Partial<User>) {
    const idArray: string[] = Array.isArray(ids) ? ids : [ids]
    const oldMap = new Map(usersByPage.value)

    try {
      // Оптимистично обновляем UI
      const updatedMap = new Map<number, User[]>()
      for (const [pageNum, users] of usersByPage.value) {
        updatedMap.set(
          pageNum,
          users.map((u) => (idArray.includes(u.id) ? { ...u, ...data } : u)),
        )
      }

      usersByPage.value = updatedMap

      await api.patch('api/admin/users', { ids, data }, { withCredentials: true })
    } catch (e) {
      error.value = getErrorMessage(e)
      usersByPage.value = oldMap // откат при ошибке
    }
  }
  return {
    //*** states
    usersByPage,
    page,
    limit,
    total,
    totalPages,
    q,
    byrole,
    sort,
    //*** actions
    getUsers,
    setPage,
    deleteUsers,
    selectSort,
    selectRole,
    search,
    updateUsers,
  }
})
