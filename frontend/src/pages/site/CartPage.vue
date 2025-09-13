<template>
  <div class="cart min-h-screen container flex flex-col md:flex-row gap-5 justify-between relative">
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
    <div class="cart__summary flex-1/2 h-max sticky top-0 flex flex-col gap-5">
      <h2 class="cart__title">Итог</h2>
      <div class="cart__promo flex gap-3">
        <input class="cart__promo--inp inp" type="text" placeholder="Введите ваш промокод" />
        <UiButton variant="dark">применить</UiButton>
      </div>
      <div class="cart__total flex">
        <h2 class="text-[.7rem] decoration-dotted">Общая сумма</h2>
        <span class="border-dotted border-b block !grow-1"></span>
        <h2 class="text-[.7rem] flex items-center">
          <span>{{ storeCart.total }}</span>
          <Icon icon="fa7-solid:rub" width="26.25px" height="30px" style="color: #000" />
        </h2>
      </div>
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
