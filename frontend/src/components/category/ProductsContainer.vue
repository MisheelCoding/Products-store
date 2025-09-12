<template>
  <div class="products mt-5">
    <ProductsFilter />
    <ProductsList />
  </div>
</template>

<script setup lang="ts">
import ProductsFilter from '@/components/category/ProductsFilter.vue'

import ProductsList from '@/components/category/ProductsList.vue'
</script>

<style scoped></style>
