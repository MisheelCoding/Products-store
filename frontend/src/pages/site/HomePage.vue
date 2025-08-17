<template>
  <div>
    <HomeHero />
    <homeCategories />
  </div>
</template>

<script setup lang="ts">
import HomeHero from '@/components/home/HomeHero.vue'
import { defineAsyncComponent } from 'vue'
const homeCategories = defineAsyncComponent(() => import('@/components/home/HomeCategories.vue'))
</script>

<style lang="scss" scoped></style>
