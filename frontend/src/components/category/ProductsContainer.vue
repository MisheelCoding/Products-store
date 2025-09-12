<template>
  <div class="products mt-5">
    <ProductsFilter />

    <Suspense>
      <template #default><ProductsList /></template>
      <template #fallback>
        <div class="prodcuts__list gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <SkeltonProductCard
            v-for="(card, i) in storeProduct.limit"
            :key="`skelton-${i}`"
            :show-desc="false"
            :variant="'default'"
          />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import SkeltonProductCard from '@/skeltons/SkeltonProductCard.vue'
import { useProducts } from '@/stores/products'
import { defineAsyncComponent } from 'vue'

const ProductsFilter = defineAsyncComponent(
  () => import('@/components/category/ProductsFilter.vue'),
)
const ProductsList = defineAsyncComponent(() => import('@/components/category/ProductsList.vue'))
const storeProduct = useProducts()
</script>

<style scoped></style>
