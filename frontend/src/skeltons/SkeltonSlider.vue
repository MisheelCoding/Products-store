<template>
  <swiper
    class="pb-5 container"
    :slides-per-view="1"
    :space-between="spaceBetween"
    :allow-touch-move="false"
    :navigation="false"
    :pagination="false"
    :breakpoints="breakpoints"
  >
    <SwiperSlide v-for="n in count" :key="n">
      <div
        :class="['rounded-4xl bg-gray-300 !min-h-[320px]  overflow-hidden skeleton', heightClass]"
      >
        <div class="h-full w-full !max-w-[300px]"></div>
      </div>
    </SwiperSlide>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
type SwiperOptionsType = ConstructorParameters<typeof Swiper>[0]
withDefaults(
  defineProps<{
    count?: number
    heightClass?: string
    spaceBetween?: number
    breakpoints?: Record<number | string, SwiperOptionsType>
  }>(),
  {
    count: 5,
    heightClass: 'h-48',
    spaceBetween: 16,
    breakpoints: () => ({
      480: { slidesPerView: 2, spaceBetween: 20 },
      700: { slidesPerView: 3, spaceBetween: 20 },
      960: { slidesPerView: 4, spaceBetween: 20 },
      1200: { slidesPerView: 5, spaceBetween: 20 },
    }),
  },
)
</script>

<style scoped>
.skeleton {
  animation: pulse 1.2s ease-in-out infinite;
}
@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    opacity: 0.6;
  }
}
</style>
