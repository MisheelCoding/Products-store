<template>
  <div class="home-category container my-30 pb-52">
    <div class="home-category__head flex justify-between items-center">
      <UiTitle>Категорий</UiTitle>
      <UiButton aria-label="Кнопка посмотреть все" type="button" variant="outline">
        Посмотреть
      </UiButton>
    </div>
    <swiper
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
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { CATEGORY_TITLES, type ProductCategory } from '@/types/products'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const pagination = {
  clickable: true,
  renderBullet: (index: number, className: string) => {
    return `<span class="${className}"></span>`
  },
}
const modules = [Pagination, Navigation]

const images = import.meta.glob('@/assets/img/optimized/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>
// console.log(images)

type CategoryCard = {
  id: ProductCategory
  title: string
  image: string
  link: string
}

const categories = ref<CategoryCard[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

onMounted(async () => {
  loading.value = true
  try {
    const { data } = await axios.get<{ categories: ProductCategory[] }>(
      'http://localhost:5007/api/public/products/categories',
    )
    console.log(data.categories)
    categories.value = data.categories.map((c) => {
      const key = Object.keys(images).find((i) => i.endsWith(`${c}.webp`))
      return {
        id: c,
        title: CATEGORY_TITLES[c],
        image: key ? images[key] : '',
        link: `/category/${c}`,
      }
    })
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error.value = err.response?.data?.message ?? err.message
    } else if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = String(err)
    }
  } finally {
    loading.value = false
  }
})

// const categories = rawCategories.map((c) => {
//   const key = Object.keys(images).find((i) => i.endsWith(`${c.id}.webp`))
//   return {
//     ...c,
//     image: key ? images[key] : '',
//     link: `/category/${c.id}`,
//   }
// })
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
