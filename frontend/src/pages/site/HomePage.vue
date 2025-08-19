<template>
  <div>
    <HomeHero />
    <Suspense>
      <template #default>
        <homePromoSection />
      </template>
      <template #fallback>
        <div class="skeleton promo">Загрузка промо...</div>
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <homeCategories />
      </template>
      <template #fallback>
        <div class="skeleton categories">Загрузка категорий...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import HomeHero from '@/components/home/HomeHero.vue'

import { defineAsyncComponent } from 'vue'
const homeCategories = defineAsyncComponent(() => import('@/components/home/HomeCategories.vue'))
const homePromoSection = defineAsyncComponent(
  () => import('@/components/home/HomePromoSection.vue'),
)
</script>

<style lang="scss" scoped>
.skeleton {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
