<template>
  <div class="container">
    <div class="prodcuts__list gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-h-full">
      <ProductCardShared
        :variant="'favorite'"
        :show-desc="false"
        :product="p"
        v-for="p in storeFavorite.favorites"
        :key="p._id"
      />

      <template v-if="storeFavorite.loading">
        <SkeltonProductCard
          v-for="i in 5"
          :key="`skelton-${i}`"
          :variant="'favorite'"
          :show-desc="false"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCardShared from '@/components/shared/ProductCardShared.vue'
import SkeltonProductCard from '@/skeltons/SkeltonProductCard.vue'
import { useFavorite } from '@/stores/useFavorite'

import { onMounted } from 'vue'

const storeFavorite = useFavorite()

onMounted(async () => {
  await storeFavorite.fetchFavorites()
})
</script>

<style scoped></style>
