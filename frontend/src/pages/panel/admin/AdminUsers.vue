<template>
  <div class="panel-users">
    <h2 class="admin-title text-xl">Список пользователей</h2>
    <table class="panel-users__table" ref="usersTable">
      <thead>
        <tr>
          <th
            v-for="col in tableData"
            :key="col.key"
            :class="{ 'hidden-mobile': col.hiddenMobile }"
          >
            {{ col.label }}
          </th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in currentUsers" :key="user.id" class="!max-h-[5rem]">
          <td
            v-for="col in tableData"
            :key="col.key"
            :class="[col.hiddenMobile ? 'hidden-mobile' : '', col.className?.(user)]"
          >
            {{ col.render ? col.render(user) : user[col.key] }}
          </td>
          <td>
            <AdminActionMenu
              :user="user"
              :open="activeMenuId === user.id"
              @delete="confirmDelete"
              @toggleban="handleBan"
              @edit="openDetail"
              @toggle="toggleMenu(user.id)"
            ></AdminActionMenu>
          </td>
        </tr>
      </tbody>
    </table>
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
import { formatDateTime } from '@/utils/date'
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import AdminActionMenu from './AdminActionMenu.vue'
import { getPagination } from '@/utils/pagination'
import PanelPagination from '@/pages/panel/shared/PanelPagination.vue'

//vars
const useUsers = useAdminUsersStore()
const { usersByPage, page, totalPages } = storeToRefs(useUsers)
const activeMenuId = ref<string | null>(null)
const usersTable = ref<HTMLElement | null>(null)
//computed
const currentUsers = computed(() => usersByPage.value.get(page.value))
const pagination = computed(() => getPagination(page.value, totalPages.value, 5))

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

// класс для статуса блокировки
const banStatusClass = (user: User) => {
  if (user.roles.includes('SUPER_ADMIN')) return 'text-gray-500' // например, нельзя менять
  return user.isBanned ? 'text-red-500' : 'text-green-500'
}

// текст статуса блокировки
const banStatusText = (user: User) => {
  if (user.roles.includes('SUPER_ADMIN')) return 'Нельзя заблокировать'
  return user.isBanned ? 'Заблокирован' : 'Незаблокирован'
}

// класс для верификации
const verifiedClass = (user: User) => (user.verified ? 'text-green-500' : 'text-red-500')

function openDetail(u: User) {
  console.log('openDetail', u.id)
}

function confirmDelete(u: User) {
  console.log('confirmDelete', u.id)
}

function handleBan(u: User) {
  console.log('handleBan', u.id)
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

type TableColumn<T> = {
  key: keyof T
  label: string
  hiddenMobile?: boolean
  render?: (row: T) => string | number | boolean | null
  className?: (row: T) => string | undefined
}

const tableData: TableColumn<User>[] = [
  { key: 'username', label: 'Имя' },
  { key: 'email', label: 'Email', hiddenMobile: true },
  { key: 'phone', label: 'Телефон', hiddenMobile: true },
  {
    key: 'roles',
    label: 'Роли',
    render: (u) => u.roles.join(', '),
  },
  {
    key: 'verified',
    label: 'Верификация',
    hiddenMobile: true,
    render: (u) => (u.verified ? 'Подтвержден' : 'Неподтвержден'),
    className: (u) => verifiedClass(u),
  },
  {
    key: 'isBanned',
    label: 'Статус',
    hiddenMobile: true,
    render: (u) => banStatusText(u),
    className: (u) => banStatusClass(u),
  },
  {
    key: 'createdAt',
    label: 'Создан',
    hiddenMobile: true,
    render: (u) => formatDateTime(u.createdAt, false),
  },
]
</script>

<style scoped lang="scss">
.panel-users {
  // container: admin-users / inline-size;

  &__table {
    width: 100%;
    min-height: 80svh;
    overflow-y: auto;
    border-collapse: collapse;

    th,
    td {
      padding: 0.5rem;
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
@container admin-content (max-width: 900px) {
  .hidden-mobile {
    display: none;
  }
}
</style>
