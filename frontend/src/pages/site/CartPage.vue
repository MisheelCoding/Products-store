<template>
  <div class="cart min-h-screen">
    <div
      v-if="storeCart.itemsWithProducts.length"
      class="min-h-screen container flex flex-col md:flex-row gap-5 justify-between relative"
    >
      <div class="cart__list flex-1/2 flex flex-col gap-5">
        <ProductCardShared
          :variant="'cart'"
          :show-desc="false"
          :product="card.product"
          v-for="card in storeCart.itemsWithProducts"
          :subtotal="card.subtotal"
          :line="card.line"
          :key="card.product?._id"
        />
      </div>
      <div class="cart__summary flex-1/2 h-max sticky top-0 flex flex-col gap-7">
        <h2 class="cart__title">Итог</h2>
        <div class="cart__promo flex gap-3">
          <input class="cart__promo--inp inp" type="text" placeholder="Введите ваш промокод" />
          <UiButton variant="outline">применить</UiButton>
        </div>
        <div class="cart__total flex items-end">
          <h2 class="text-[.7rem] decoration-dotted">Общая сумма</h2>
          <span class="border-dotted self-end border-b block !grow-1"></span>
          <h2 class="text-[.7rem] flex items-end">
            <span>{{ storeCart.total }}</span>
            <Icon icon="fa7-solid:rub" width="26.25px" height="30px" style="color: #000" />
          </h2>
        </div>
        <Ui-Button variant="dark" class="cart__button-checkout w-full max-w-[20rem] mx-auto"
          >Перейти к оформлению</Ui-Button
        >
      </div>
    </div>
    <div
      v-else
      class="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col justify-center items-center gap-6"
    >
      <Icon icon="mdi:cart" width="100px" height="100px" style="color: #ccc" />
      <!-- <div class="flex items-center text-[#ccc]"> -->

      <span class="title text-center text-[.4rem] sm:text-[.9rem]">ничего нет... пока!</span>
      <!-- </div> -->
      <UiButton variant="dark" type="button" :to="{ name: 'category', params: { id: 'all' } }">
        Начните шопинг
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCardShared from '@/components/shared/ProductCardShared.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { useCart } from '@/stores/cart'
import { Icon } from '@iconify/vue'

const storeCart = useCart()
</script>

<style scoped></style>
