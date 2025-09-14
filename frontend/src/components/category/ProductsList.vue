<template>
  <div class="prodcuts__list gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    <ProductCardShared
      class="justify-self-center"
      :product="p"
      :show-desc="true"
      variant="default"
      v-for="p in products"
      :key="p._id"
    ></ProductCardShared>
    <template v-if="productsStore.isFetchingMore">
      <SkeltonProductCard
        v-for="(card, i) in productsStore.limit"
        :key="`skeleton-${i}`"
        :variant="'default'"
        :show-desc="false"
        class="justify-self-center"
      />
    </template>
    <div ref="sentinel"></div>
  </div>
</template>

<script setup lang="ts">
import ProductCardShared from '@/components/shared/ProductCardShared.vue'
import SkeltonProductCard from '@/skeltons/SkeltonProductCard.vue'
import { useProducts } from '@/stores/products'
import { storeToRefs } from 'pinia'

const productsStore = useProducts()
const { products } = storeToRefs(productsStore)

import { onMounted, ref } from 'vue'

const sentinel = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sentinel.value) return

  const observer = new IntersectionObserver(
    async ([entry]) => {
      if (entry.isIntersecting && productsStore.hasMore && !productsStore.isFetchingMore) {
        await productsStore.fetchMoreProducts()
      }
    },
    { threshold: 1 },
  )

  observer.observe(sentinel.value)
})
</script>

<style scoped></style>
