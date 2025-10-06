<template>
  <div class="action-menu relative flex justify-center items-center" :data-menu-id="payload.id">
    <button @click="emit('toggle')" class="">
      <Icon
        icon="mi:options-vertical"
        width="30px"
        height="30px"
        :style="{ color: open ? 'var(--admin-color-helper)' : '#fff' }"
      />
    </button>

    <div v-show="open" class="absolute action-menu__container z-2 p-2">
      <button
        class="flex items-center"
        v-for="a in actions"
        :key="a.event"
        @click="emit(a.event, payload)"
      >
        <Icon :icon="a.icon" /> {{ a.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { User } from '@/types/auth'
// import AdminActionMenu from '@/pages/panel/admin/AdminActionMenu.vue'

defineProps<{
  actions: { label: string; icon: string; event: 'edit' | 'delete' | 'toggleban' }[]
  payload: User
  open: boolean
}>()

const emit = defineEmits<{
  (e: string, payload: User): void
  (e: 'toggle'): void
  (e: 'toggleban'): void
  (e: 'edit'): void
  (e: 'delete'): void
}>()
</script>

<style scoped lang="scss">
.action-menu {
  &__container {
    top: 0;
    left: -100%;
    background: var(--admin-bg-cart);
  }
}
@container admin-content (max-width: 900px) {
  .action-menu {
    &__container {
      top: 0;
      left: -5%;
      background: var(--admin-bg-cart);
    }
  }
}
@container admin-content (max-width: 450px) {
  .action-menu {
    &__container {
      left: -60%;
    }
  }
}
</style>
