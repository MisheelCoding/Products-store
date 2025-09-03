<script setup lang="ts">
import ProductsContainer from '@/components/category/ProductsContainer.vue'
import {
  CATEGORY_TITLES,
  type Product,
  type ProductCategory,
  type ProductsListResponse,
} from '@/types/products'
import axios from 'axios'
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps<{ id: string }>()

const title = computed(() => {
  const key = props.id as ProductCategory
  return CATEGORY_TITLES[key] ?? 'undefined'
})

const products = ref<Product[]>([])

async function fetchProducts() {
  const res = await axios.get<ProductsListResponse>(`http://localhost:5007/api/public/products`, {
    params: { category: props.id === 'all' ? '' : props.id },
  })

  products.value = res.data.items
  // console.log(products.value)
}

onMounted(() => {
  fetchProducts()
})
watch(
  () => props.id,
  () => fetchProducts(),
)
</script>

<template>
  <section class="container py-10">
    <h1 class="text-2xl font-bold">Категория: {{ title }}</h1>

    <ProductsContainer />
  </section>
</template>
