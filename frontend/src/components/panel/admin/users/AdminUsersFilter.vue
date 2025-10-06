<template>
  <div class="panel-users-filters my-5">
    <div class="panel-users-filters__wrapper relative">
      <UiButton class="panel-users-filters__btn" @click="toggleFilterContainer" variant="outline"
        >Фильтры</UiButton
      >

      <div ref="mobileFilterContainer" class="panel-users-filters__filter flex gap-5">
        <UiSelect
          @selected-value="useUsers.selectSort"
          v-model:modelValue="sort"
          :items="filterSort"
          size="default"
        ></UiSelect>
        <UiSelect
          @selected-value="useUsers.selectRole"
          v-model:modelValue="byrole"
          :items="filterByRole"
          size="default"
        ></UiSelect>
        <UiSearch @on-input="useUsers.search(q)" size="default" v-model="q"></UiSearch>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
import UiSearch from '@/components/ui/UiSearch.vue'
import UiSelect, { type Dropdown } from '@/components/ui/UiSelect.vue'
import { useAdminUsersStore } from '@/stores/admin/adminUsers'
import type { UserRoles } from '@/types/auth'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const useUsers = useAdminUsersStore()
const { sort, byrole, q } = storeToRefs(useUsers)

export type SortValue = 'createdAt_asc' | 'createdAt_desc' | 'username_asc' | 'username_desc'

const mobileFilterContainer = ref<HTMLElement | null>(null)

function toggleFilterContainer() {
  if (mobileFilterContainer.value) {
    mobileFilterContainer.value.classList.toggle('hidden')
  }
}
const filterByRole: Dropdown<UserRoles>[] = [
  {
    value: 'SUPER_ADMIN',
    label: 'Супер Админ',
    icon: 'dashicons:admin-site-alt3',
    iconSize: '25px',
  },
  { value: 'ADMIN', label: 'Админ', icon: 'ri:admin-line', iconSize: '25px' },
  { value: 'USER', label: 'Пользователь', icon: 'mage:user', iconSize: '25px' },
]
const filterSort: Dropdown<SortValue>[] = [
  {
    value: 'createdAt_asc',
    label: 'по дате возрастанию',
    iconSize: '25px',
    icon: 'tabler:sort-a-z',
  },
  {
    value: 'createdAt_desc',
    label: 'по дате убываению',
    iconSize: '25px',
    icon: 'tabler:sort-z-a',
  },
  { value: 'username_asc', label: 'по имени', iconSize: '25px', icon: 'tabler:sort-a-z' },
  { value: 'username_desc', label: 'по имени', iconSize: '25px', icon: 'tabler:sort-z-a' },
]
</script>

<style scoped lang="scss">
.panel-users-filters__btn {
  display: none;
}
@container admin-content (max-width:900px) {
  .panel-users-filters__filter {
    position: absolute;
    top: 70px;
    left: 5px;
    background: var(--admin-bg-cart-gradient);
    padding: 1rem;
    border-radius: 10px;
    flex-direction: column;
    max-width: 25rem;
    display: none;

    &:not(.hidden) {
      display: flex;
    }
    &:nth-child(3) {
      order: 1;
    }
  }
  .panel-users-filters__btn {
    display: block !important;
  }
}
</style>
