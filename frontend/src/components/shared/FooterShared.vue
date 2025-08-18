<template>
  <footer class="footer bg-stone-900 text-white p-5">
    <div class="container mx-auto">
      <div class="footer__head flex justify-between gap-10">
        <router-link to="/" class="footer__logo" aria-label="На главную">Logo</router-link>
        <p class="footer__usp max-w-[22rem]">
          Натуральные продукты от местных фермеров. Прямо с поля – к вашему столу
        </p>
      </div>
      <nav class="footer__nav my-10 flex flex-col md:flex-row gap-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 order-2 basis-2/3 gap-5">
          <section class="footer__col" v-for="col in config.columns" :key="col.title">
            <h2 class="footer__title">{{ col.title }}</h2>
            <ul class="footer__list mt-2">
              <li class="mt-1" v-for="l in col.links" :key="l.to">
                <router-link :to="l.to">{{ l.label }}</router-link>
              </li>
            </ul>
          </section>
        </div>
        <section class="footer__col basis-1/3">
          <h2 class="footer__title">Контакты</h2>
          <div class="flex md:flex-col flex-row justify-between">
            <address class="footer__contacts mt-2">
              <a :href="`tel:${config.contacts.phoneRaw}`">{{ config.contacts.phoneView }}</a
              ><br />
              <a :href="`mailto:${config.contacts.email}`">{{ config.contacts.email }}</a
              ><br />
              <span class="footer__hours">Ежедневно: {{ config.contacts.hours }}</span>
            </address>
            <ul class="footer__social" aria-label="Мы в социальных сетях">
              <li v-for="l in config.socials" :key="l.short">
                <a :href="l.href" :aria-label="l.name">{{ l.name }}</a>
              </li>
            </ul>
          </div>
        </section>
      </nav>
      <div class="footer__bottom grid grid-cols-3 grid-rows-2 items-center">
        <ul
          class="footer__payments flex gap-3 justify-self-start"
          aria-label="Принимаемые способы оплаты"
        >
          <li v-for="p in config.payments" :key="p" :aria-label="p">{{ p }}</li>
        </ul>
        <ul
          class="footer__legal flex gap-3 justify-self-end sm:justify-self-center col-[3/4] sm:col-[2/3]"
        >
          <li v-for="(l, i) in config.legal" :key="l.to">
            <router-link :to="l.to">{{ l.short }}</router-link>
            <span v-if="i < config.legal.length - 1" class="ml-3">|</span>
          </li>
        </ul>
        <small
          class="footer__copy justify-self-center text-nowrap sm:col-[3/4] col-[2/3] sm:row-[1/2] row-[2/3] sm:justify-self-end"
          >© {{ new Date().getFullYear() }} Misheel's grocery</small
        >
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { defaultFooterConfig, type FooterConfig } from '@/data/footer'

const { config } = withDefaults(defineProps<{ config?: FooterConfig }>(), {
  config: () => defaultFooterConfig,
})
// const props = withDefaults(defineProps<{ config?: FooterConfig }>(), {
//   config: () => defaultFooterConfig,
// })
// const config = props.config
</script>

<style scoped lang="scss">
h2 {
  font-size: 0.7rem;
  @media (min-width: 850px) {
    font-size: 1rem;
  }
}
</style>
