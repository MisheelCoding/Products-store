<template>
  <div class="min-h-[90svh] flex justify-center items-center">
    <div class="flex flex-col gap-3">
      <FuzzyText text="404" color="black" :font-size="isMobile ? '1.5rem' : '3rem'"> </FuzzyText>
      <FuzzyText text="Страница не найдена" color="black" :font-size="isMobile ? '1.5rem' : '3rem'">
      </FuzzyText>
    </div>
  </div>
</template>

<script setup lang="ts">
import FuzzyText from '@/components/vue-bits/Animations/FuzzyText/FuzzyText.vue'

const isMobile = window.innerWidth < 768
</script>

<style scoped></style>
