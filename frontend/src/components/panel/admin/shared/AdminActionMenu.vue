<template>
  <UiActionMenu
    :actions="actions"
    :payload="user"
    :open="open"
    @delete="$emit('delete', user)"
    @edit="$emit('edit', user)"
    @toggleban="$emit('toggleban', user)"
    @toggle="$emit('toggle', user.id)"
  >
  </UiActionMenu>
</template>

<script setup lang="ts">
import UiActionMenu from '@/components/ui/UiActionMenu.vue'
import type { User } from '@/types/auth'
import { computed } from 'vue'

const props = defineProps<{ user: User; open: boolean }>()
defineEmits<{
  (e: 'edit', u: User): void
  (e: 'delete', u: User): void
  (e: 'toggleban', u: User): void
  (e: 'toggle', userId: string): void
}>()
export type AdminMenuAction = {
  label: string
  icon: string
  event: 'edit' | 'delete' | 'toggleban'
}[]
const actions = computed<{ label: string; icon: string; event: 'edit' | 'delete' | 'toggleban' }[]>(
  () => [
    { label: 'Редактировать', icon: 'mdi:pencil', event: 'edit' },
    {
      label: props.user.isBanned ? 'Разблокировать' : 'Заблокировать',
      icon: props.user.isBanned ? 'mdi:lock-open' : 'mdi:lock',
      event: 'toggleban',
    },
    { label: 'Удалить', icon: 'mdi:delete', event: 'delete' },
  ],
)
</script>

<style scoped></style>
