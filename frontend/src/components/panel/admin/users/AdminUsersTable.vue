<template>
  <table class="panel-users__table">
    <thead>
      <tr>
        <th>
          <label class="flex gap-3 items-center"
            ><input type="checkbox" :checked="allSelected" @change="emit('toggleAll', $event)" />{{
              isMobile ? '' : 'Выбрать'
            }}</label
          >
        </th>
        <th v-for="col in tableData" :key="col.key" :class="{ 'hidden-mobile': col.hiddenMobile }">
          {{ col.label }}
        </th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in currentUsers" :key="user.id" class="!max-h-[5rem]">
        <td>
          <input type="checkbox" :value="user.id" v-model="selectedUsers" />
        </td>
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
            @delete="emit('delete', user)"
            @toggleban="emit('ban', user)"
            @edit="emit('edit', user)"
            @toggle="emit('toggleMenu', user.id)"
          ></AdminActionMenu>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import AdminActionMenu from '@/components/panel/admin/shared/AdminActionMenu.vue'
import { tableData } from '@/components/panel/admin/users/lib/tableData'
import { useIsMobile } from '@/composables/shared/useMobile'
import { type User } from '@/types/auth'
const { isMobile } = useIsMobile()

defineProps<{
  currentUsers: User[]
  // selectedUsers: string[]
  activeMenuId: string | null
  allSelected: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleMenu', id: string): void
  (e: 'delete', u: User): void
  (e: 'ban', u: User): void
  (e: 'edit', u: User): void
  (e: 'toggleAll', event: Event): void
}>()

const selectedUsers = defineModel<string[]>('selectedUsers')
</script>

<style scoped lang="scss">
.panel-users__table {
  width: 100%;
  min-height: 75svh;
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
@container admin-content (max-width: 900px) {
  .hidden-mobile {
    display: none;
  }
}
</style>
