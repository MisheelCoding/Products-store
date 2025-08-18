<template>
  <div class="home-category container my-30">
    <div class="home-category__head flex justify-between items-center">
      <UiTitle>Категорий</UiTitle>
      <UiButton aria-label="Кнопка посмотреть все" type="button" variant="outline">
        Посмотреть
      </UiButton>
    </div>
    <!--  error-->
    <p v-if="error" class="mt-4 text-red-600">{{ error }}</p>
    <!--  loading-->
    <swiper
      v-else-if="loading"
      class="pb-5"
      :slides-per-view="1"
      :space-between="16"
      :allow-touch-move="false"
      :navigation="false"
      :pagination="false"
      :breakpoints="{
        480: { slidesPerView: 2, spaceBetween: 20 },
        700: { slidesPerView: 3, spaceBetween: 20 },
        960: { slidesPerView: 4, spaceBetween: 20 },
        1200: { slidesPerView: 5, spaceBetween: 20 },
      }"
    >
      <SwiperSlide v-for="n in 5" :key="n">
        <div class="h-48 rounded-lg bg-gray-200 overflow-hidden skeleton">
          <div class="h-full w-full"></div>
        </div>
      </SwiperSlide>
    </swiper>
    <!-- slider -->
    <swiper
      v-else
      class="pb-5"
      :slides-per-view="1"
      :modules="modules"
      :navigation="{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      }"
      :pagination="pagination"
      :space-between="16"
      :auto-height="true"
      :breakpoints="{
        480: { slidesPerView: 2, spaceBetween: 20 },
        700: { slidesPerView: 3, spaceBetween: 20 },
        960: { slidesPerView: 4, spaceBetween: 20 },
        1200: { slidesPerView: 5, spaceBetween: 20 },
      }"
    >
      <SwiperSlide class="home-category-swiper" v-for="category in categories" :key="category.id">
        <HomeCategoryCard :category="category"></HomeCategoryCard>
      </SwiperSlide>
      <div v-if="loading">loading</div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-pagination"></div>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
import UiTitle from '@/components/ui/UiTitle.vue'
import HomeCategoryCard from '@/components/home/HomeCategoryCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
const { categories, ensure, error, loading } = useCategories()
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useCategories } from '@/composables/useCategries'
import { onMounted } from 'vue'

const pagination = {
  clickable: true,
  renderBullet: (index: number, className: string) => {
    return `<span class="${className}"></span>`
  },
}
const modules = [Pagination, Navigation]

onMounted(() => {
  ensure()
})
</script>

<style lang="scss" scoped>
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: black; // активное состояние стрелки
  &::after {
    font-size: 30px;
  }

  &.swiper-button-disabled {
    color: rgba(0, 0, 0, 0.5); //(disabled) стрелки
  }
}

:deep(.swiper-pagination) {
  width: max-content !important;
  left: 50%;
  transform: translateX(-50%) translateY(10px);

  & > .swiper-pagination-bullet {
    background-color: rgb(255, 255, 255);
    opacity: 0.8;
  }
  & > .swiper-pagination-bullet-active {
    background-color: black;
  }
}
</style>
