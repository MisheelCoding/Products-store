<template>
  <div>
    <HomeHero />
    <!-- <SkeltonPromo :count="2" /> -->

    <Suspense>
      <template #default>
        <homePromoSection />
      </template>
      <template #fallback>
        <SkeltonPromo :count="2" />
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <homeCategories />
      </template>
      <template #fallback>
        <SkeltonSlider />
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import HomeHero from '@/components/home/HomeHero.vue'
import SkeltonPromo from '@/skeltons/home/SkeltonPromo.vue'
import SkeltonSlider from '@/skeltons/SkeltonSlider.vue'

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
