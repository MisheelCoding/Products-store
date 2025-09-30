<template>
  <div class="wrapper mb-10">
    <!-- *** Filter -->
    <div class="filter relative flex gap-5 justify-between">
      <UiButton class="flex items-center gap-1" variant="dark" @click="filterIsOpen = !filterIsOpen"
        ><Icon icon="mage:filter" width="20px" height="30px" style="color: #fff" />filter</UiButton
      >
      <!-- *** Поиск   -->
      <input type="search" class="border-b outline-0" placeholder="поиск по названию..." />
      <!-- *** -->
      <Transition name="collapse">
        <div
          v-show="filterIsOpen && categories.length"
          class="filter-container absolute left-0 top-15 max-w-[25rem] max-h-[19rem] border rounded-3xl overflow-x-hidden p-5 z-10 bg-[#ececec]"
        >
          <!-- arrow -->

          <!--  -->
          <label class="flex items-center gap-1">
            <!-- <Icon
              icon="material-symbols-light:category-outline"
              width="30px"
              height="30px"
              style="color: #000"
            /> -->
            <h2 class="text-[8px] filter-title">Категорий</h2>
          </label>
          <div class="overflow-x-auto min-h-11 py-5 px-2 flex" ref="scrollContainer">
            <button class="absolute top-[65px] left-1 z-10 cursor-pointer i" @click="scroll(-150)">
              ⬅
            </button>
            <ui-button
              class="mr-2 shrink-0"
              :class="{ active: $route.params.id === 'all' }"
              :variant="$route.params.id === 'all' ? 'dark' : 'outline'"
              :to="{ name: 'category', params: { id: 'all' } }"
              @click="selectCategory('all')"
              >Все</ui-button
            >
            <ui-button
              class="mr-2 shrink-0"
              :class="{ active: $route.params.id === item.id }"
              :variant="$route.params.id === item.id ? 'dark' : 'outline'"
              :to="{ name: 'category', params: { id: item.id } }"
              @click="selectCategory(item.id)"
              v-for="(item, i) in categories"
              :key="i"
              >{{ item.title }}</ui-button
            >

            <!-- arrow -->
            <button
              class="absolute right-1 z-10 top-[65px] cursor-pointer rotate-180"
              @click="scroll(150)"
            >
              ⬅
            </button>
          </div>

          <!-- *** sort -->
          <label class="flex items-center gap-1">
            <!-- <Icon icon="pepicons-pop:sort" width="30px" height="30px" style="color: #000" /> -->
            <h2 class="text-[8px] my-4">Сортировка</h2>
          </label>
          <div class="sort-container flex flex-col gap-5">
            <ui-button
              v-for="(value, key) in SORT_OPTIONS"
              :key="key"
              @click="selectSort(key)"
              :variant="isSortActive(key) ? 'dark' : 'outline'"
            >
              {{ value }}
            </ui-button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategories } from '@/composables/products/useCategries'
import UiButton from '@/components/ui/UiButton.vue'
import { Icon } from '@iconify/vue'
import { computed, onMounted, ref } from 'vue'
import { SORT_OPTIONS, type SortOption } from '@/types/products.filters'
import { useCoordinatorFilter } from '@/composables/products/useProductsCoordinator'

// import type { ProductCategory } from '@/types/products'
const { selectCategory, selectSort, sort } = useCoordinatorFilter()
const { categories, refresh } = useCategories()
const scrollContainer = ref<HTMLElement | null>(null)

const filterIsOpen = ref(false)

function scroll(amount: number) {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({
      left: amount,
      behavior: 'smooth',
    })
  }
}

const isSortActive = computed(() => (sortKey: SortOption) => {
  return sort.value === sortKey
})

onMounted(() => {
  if (!categories.value || categories.value.length === 0) {
    refresh()
  }
})
</script>

<style scoped>
.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}
.collapse-enter-to,
.collapse-leave-from {
  max-height: 19rem; /* поставь реальный максимум */
  opacity: 1;
}
.collapse-enter-active,
.collapse-leave-active {
  transition:
    max-height 500ms ease,
    opacity 500ms ease;
}
</style>
