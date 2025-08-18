<template>
  <div class="relative hero h-[90vh]">
    <img
      draggable="false"
      class="hero__img w-full h-full absolute object-cover object-[60%] lg:object-center"
      :src="heroImg"
      loading="lazy"
      alt="продукты в пакете"
    />
    <div class="hero__content z-50 relative h-full flex items-center ml-40 container">
      <div class="max-w-[53rem] flex flex-col gap-3">
        <UiTitle>Свежесть премиум-класса в каждом заказе</UiTitle>

        <p class="text-2xl">
          Мы доставим всё, что вам нужно — от фермерских овощей до деликатесов — быстро и удобно.
        </p>
        <UiButton
          class="self-start"
          aria-label="Кнопка начать покупки"
          type="button"
          variant="dark"
          size="auto"
          to="/"
        >
          Начать покупки
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import heroImg from '@/assets/img/optimized/home-hero.webp'

import UiButton from '@/components/ui/UiButton.vue'
import UiTitle from '@/components/ui/UiTitle.vue'
</script>

<style scoped></style>
