<template>
  <article class="promo-card relative">
    <img :src="img" :alt="alt" class="promo-card__img" />
    <div
      class="promo-card__content absolute top-10 right-5 flex flex-col gap-2 max-w-72 items-end"
      :style="{ color: textColor }"
    >
      <h2 class="promo-card__title text-[10px] text-end leading-[150%]">{{ title }}</h2>
      <p class="promo-card__desc font-semibold text-amber-300 text-xl">{{ desc }}</p>
      <UiButton variant="white" class="promo-card__btn" type="button" to="/">{{
        btnText
      }}</UiButton>
    </div>
  </article>
</template>

<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
interface PromoCardProps {
  img: string
  alt: string
  title: string
  desc: string
  btnText: string
  link: string
  textColor: string
}

defineProps<PromoCardProps>()
</script>

<style scoped></style>
