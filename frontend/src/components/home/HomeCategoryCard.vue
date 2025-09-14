<template>
  <div class="home-category__item h-80 relative mt-5">
    <img
      :src="category.image"
      :alt="category.id"
      class="absolute left-1/2 top-1/2 -translate-1/2 h-full !max-w-[300px] object-cover rounded-4xl"
    />
    <UiButton
      :to="{ name: 'category', params: { id: category.id } }"
      class="!absolute -translate-x-1/2 left-1/2 bottom-0 z-50"
      type="button"
      variant="white"
      >{{ category.title }}</UiButton
    >
  </div>
</template>

<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'

interface Category {
  id: string
  title: string
  link: string
  image: string
}
const { category } = defineProps<{ category: Category }>()
</script>
