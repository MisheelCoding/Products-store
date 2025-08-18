<template>
  <section class="home-promo flex sm:flex-row flex-col container gap-10 mt-30">
    <PromoCardShared v-for="(card, i) in promoItems" :key="i" v-bind="card"></PromoCardShared>
  </section>
</template>

<script setup lang="ts">
import PromoFruits from '@/assets/img/optimized/promoFruits.webp'
import PromoVegetables from '@/assets/img/optimized/promoVegetables.webp'
import PromoCardShared from '@/components/shared/PromoCardShared.vue'

const promoItems = [
  {
    img: PromoVegetables,
    alt: 'Свежие овощи',
    title: 'Свежие здоровые овощи',
    desc: 'Лови выгоду −20%',
    btnText: 'Купить овощи',
    link: '/vegetables',
    textColor: 'white',
  },
  {
    img: PromoFruits,
    alt: 'Свежие фрукты',
    title: 'Свежие здоровые фрукты',
    desc: '−20% на свежесть',
    btnText: 'Купить фрукты',
    link: '/fruits',
    textColor: 'white',
  },
]
</script>

<style scoped></style>
