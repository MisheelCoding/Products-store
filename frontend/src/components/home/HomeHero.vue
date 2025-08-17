<template>
  <div class="relative hero h-[90vh]">
    <img
      draggable="false"
      class="hero__img w-full h-full object-cover absolute"
      :src="heroImg"
      loading="lazy"
      alt="продукты в пакете"
    />
    <div
      class="hero__content absolute left-0 h-max !top-1/2 -translate-y-1/2 max-w-[53rem] flex flex-col gap-10 ml-5 md:ml-30"
    >
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
</template>

<script setup lang="ts">
import heroImg from '@/assets/img/optimized/home-hero.webp'

import UiButton from '@/components/ui/UiButton.vue'
import UiTitle from '@/components/ui/UiTitle.vue'
</script>

<style scoped></style>
