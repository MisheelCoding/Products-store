<template>
  <div class="panel-users" ref="usersTable">
    <h2 class="admin-title text-xl">Список пользователей</h2>
    <!--*** фильтр -->
    <AdminUsersFilter />
    <!--*** Таблица -->
    <AdminUsersTable
      :currentUsers="currentUsers || []"
      :open="activeMenuId"
      v-model:selectedUsers="selectedUsers"
      :activeMenuId="activeMenuId"
      :allSelected="allSelected"
      @toggle-all="toggleAll"
      @ban="handleBan"
      @delete="confirmDelete"
      @edit="openDetail"
      @toggle-menu="toggleMenu"
    />
    <!--*** Пагинация -->
    <panel-pagination
      :items="pagination"
      :current-page="page"
      @change="changePage"
    ></panel-pagination>
  </div>
</template>

<script setup lang="ts">
import { useAdminUsersStore } from '@/stores/admin/adminUsers'
import type { User } from '@/types/auth'
import { storeToRefs } from 'pinia'

import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getPagination } from '@/utils/pagination'
import PanelPagination from '@/components/panel/admin/shared/PanelPagination.vue'
import AdminUsersFilter from '@/components/panel/admin/users/AdminUsersFilter.vue'

import AdminUsersTable from '@/components/panel/admin/users/AdminUsersTable.vue'

import { getErrorMessage } from '@/scripts/api'

const useUsers = useAdminUsersStore()
const { usersByPage, page, totalPages } = storeToRefs(useUsers)
//vars
const activeMenuId = ref<string | null>(null)
const usersTable = ref<HTMLElement | null>(null)
const selectedUsers = ref<string[]>([])

//computed
const currentUsers = computed(() => usersByPage.value.get(page.value))
const pagination = computed(() => getPagination(page.value, totalPages.value, 5))
const allSelected = computed(() =>
  currentUsers.value ? selectedUsers.value.length === currentUsers.value.length : false,
)

function toggleAll(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  if (checked && currentUsers.value) {
    selectedUsers.value = currentUsers.value.map((u) => u.id)
  } else {
    selectedUsers.value = []
  }
}

async function changePage(newPage: number) {
  useUsers.setPage(newPage)
  await useUsers.getUsers(newPage)
  console.log('change')
}

const toggleMenu = (userId: string) => {
  activeMenuId.value = activeMenuId.value === userId ? null : userId
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest(`[data-menu-id="${activeMenuId.value}"]`)) {
    activeMenuId.value = null
  }
}

function openDetail(u: User) {
  console.log('openDetail', u.id)
}

function confirmDelete(u: User) {
  console.log('confirmDelete', u.id)
}

async function handleBan(u: User | User[], ban?: boolean) {
  const ids: string[] = Array.isArray(u) ? u.map((user) => user.id) : [u.id]
  const shouldBan = ban !== undefined ? ban : !Array.isArray(u) ? !u.isBanned : undefined
  try {
    await useUsers.updateUsers(ids, { isBanned: shouldBan })
  } catch (e) {
    console.log(getErrorMessage(e))
  }
}

onMounted(async () => {
  await useUsers.getUsers(page.value)
  if (usersTable.value) {
    usersTable.value.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  if (usersTable.value) {
    usersTable.value.removeEventListener('click', handleClickOutside)
  }
})
</script>

<style scoped lang="scss">
.panel-users {
  // container: admin-users / inline-size;

  &__table {
    width: 100%;
    min-height: 75svh;
    overflow-y: auto;
    border-collapse: collapse;

    th,
    td {
      padding: 0.25rem;
      text-align: left;
    }

    td {
      border-bottom: 0.5px solid rgba(255, 255, 255, 0.456);
    }

    thead {
      background-color: #4444445f;
    }
  }
}
</style>
