<template>
  <div class="prodcuts__list gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <ProductCardShared
      class="justify-self-center"
      :product="p"
      v-for="p in products"
      :key="p._id"
    ></ProductCardShared>
  </div>
</template>

<script setup lang="ts">
import ProductCardShared from '@/components/shared/ProductCardShared.vue'
import { useProducts } from '@/stores/products'
import { storeToRefs } from 'pinia'

const productsStore = useProducts()
const { products } = storeToRefs(productsStore)
</script>

<style scoped></style>
