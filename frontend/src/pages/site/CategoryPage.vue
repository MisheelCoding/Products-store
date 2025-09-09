<script setup lang="ts">
import ProductsContainer from '@/components/category/ProductsContainer.vue'
import { useCoordinatorFilter } from '@/composables/products/useProductsCoordinator'
const { category, sort, loadProducts } = useCoordinatorFilter()

import { CATEGORY_TITLES, type ProductCategory } from '@/types/products'

import { computed, onMounted } from 'vue'

const props = defineProps<{ id: string }>()

const title = computed(() => {
  const key = props.id as ProductCategory
  return CATEGORY_TITLES[key] ?? 'undefined'
})

onMounted(async () => {
  await loadProducts()
})
</script>

<template>
  <section class="container py-10">
    <h1 class="text-2xl font-bold">Категория: {{ title }}- {{ category }} -{{ sort }}</h1>

    <ProductsContainer />
  </section>
</template>
