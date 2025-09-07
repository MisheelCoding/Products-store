<script setup lang="ts">
import ProductsContainer from '@/components/category/ProductsContainer.vue'
import { useSelectedCategory } from '@/composables/products/slices/useSelectedCategory'
import { useSorting } from '@/composables/products/slices/useSorting'
import { useProducts } from '@/stores/products'

import { CATEGORY_TITLES, type ProductCategory } from '@/types/products'

import { computed, onMounted, watch } from 'vue'
const { category } = useSelectedCategory()
const props = defineProps<{ id: string }>()

const title = computed(() => {
  const key = props.id as ProductCategory
  return CATEGORY_TITLES[key] ?? 'undefined'
})

const { fetchProducts } = useProducts()
const { sort } = useSorting()
const getProductsParams = () => {
  return { ...(props.id !== 'all' && { category: props.id, sort: sort.value }), page: 1, limit: 5 }
}

onMounted(async () => {
  await fetchProducts(getProductsParams())
})
watch(
  () => props.id,
  () => fetchProducts(getProductsParams()),
)
</script>

<template>
  <section class="container py-10">
    <h1 class="text-2xl font-bold">Категория: {{ title }} {{ category }}</h1>

    <ProductsContainer />
  </section>
</template>
