import { type UserRoles, type User } from '@/types/auth'
import api, { getErrorMessage } from '@/scripts/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UsersResponse } from '@/types/penel'

type SortOption = 'createdAt_desc' | 'createdAt_asc' | 'username_asc' | 'username_desc'
export const useAdminUsersStore = defineStore('adminUsers', () => {
  // ?? states

  const usersByPage = ref<Map<number, User[]>>(new Map())
  const page = ref(1)
  const limit = ref(7)
  const total = ref(0)
  const totalPages = ref(0)
  const q = ref('')
  const byrole = ref<UserRoles | ''>('')
  const sort = ref<SortOption>('createdAt_asc')

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

      return data.items
      // return usersByPage.value.get(currentPage)
    } catch (e) {
      getErrorMessage(e)
    }
  }

  function setPage(newPage: number) {
    page.value = newPage
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
  }
})
