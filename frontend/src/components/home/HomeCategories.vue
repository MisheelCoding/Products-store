<template>
  <div class="home-category container my-20">
    <div class="home-category__head flex justify-between items-center">
      <UiTitle>Категорий</UiTitle>
      <UiButton aria-label="Кнопка посмотреть все" type="button" variant="outline">
        Посмотреть
      </UiButton>
    </div>
    <div>
      <HomeCategoryCard
        v-for="category in categories"
        :key="category.id"
        :category="category"
      ></HomeCategoryCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
import UiTitle from '@/components/ui/UiTitle.vue'
import HomeCategoryCard from '@/components/home/HomeCategoryCard.vue'

const rawCategories = [
  { id: 'fruits', title: 'Фрукты' },
  { id: 'vegetables', title: 'Овощи' },
  { id: 'cheese', title: 'Сыры' },
  { id: 'dairy', title: 'Молочные продукты' },
  { id: 'sausages', title: 'Колбасы' },
  { id: 'sweets', title: 'Сладости' },
]

const images = import.meta.glob('@/assets/img/optimized/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>
// console.log(images)

const categories = rawCategories.map((c) => {
  const key = Object.keys(images).find((i) => i.endsWith(`${c.id}.webp`))
  return {
    ...c,
    image: key ? images[key] : '',
    link: `/category/${c.id}`,
  }
})
</script>
