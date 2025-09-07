<template>
  <div>
    <h2>{{ title }}</h2>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/products'
import { toRefs } from 'vue'

const props = defineProps<{
  product: Product
}>()

const { title, effectivePrice, imageUrl, isAvailable } = toRefs(props.product)
</script>

<style scoped></style>
