<template>
  <div>
    <ProductCardShared :product="p" v-for="p in products" :key="p._id"></ProductCardShared>
  </div>
</template>

<script setup lang="ts">
import ProductCardShared from '@/components/shared/ProductCardShared.vue'
import { useProducts } from '@/stores/products'

const { products } = useProducts()
</script>

<style scoped></style>
