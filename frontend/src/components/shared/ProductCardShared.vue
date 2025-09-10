<template>
  <article
    v-if="props.product"
    class="product-card max-w-[18rem] rounded-2xl shadow transition shadow-neutral-800/70 h-[25rem] hover overflow-hidden flex flex-col relative gap-3"
  >
    <div class="product-card__img-container group min-h-0 flex-2/3 overflow-hidden !rounded-2xl">
      <img
        class="product-card__img w-full h-full object-cover group-hover:scale-110 transition"
        src="https://res.cloudinary.com/djb8hjpdl/image/upload/v1757456157/pexels-alexy-almond-3756480_csyeer.webp "
        :alt="title"
      />
    </div>
    <div class="product-card__body p-2 flex-1/3 min-h-0 flex flex-col gap-2">
      <h2 class="text-[.6rem]">{{ title }}</h2>
      <p class="product-card__price flex gap-1 text-[1.1rem]">
        <span :class="{ 'text-red-500': effectivePrice?.old }" class="font-bold">{{
          effectivePrice?.current
        }}</span>
        <span class="line-through opacity-30" v-if="effectivePrice?.old">{{
          effectivePrice?.old
        }}</span>
        <span>/ {{ ruUnit.label }}</span>
      </p>
      <p class="product-card__desc" v-if="description && showDesc">{{ description }}</p>
      <!-- favorite -->
      <div>class</div>
      <button class="product-card__favorite cursor-pointer absolute right-2 top-2">
        <Icon
          icon="material-symbols-light:favorite"
          width="30px"
          height="30px"
          style="color: red"
        />
      </button>

      <!-- plus quantity minu btns -->

      <div class="product-card__footer flex justify-between items-center pl-3">
        <div class="product-card__controlls flex justify-center items-center gap-3">
          <button class="btn product-card__controll-btn scale-150 border">-</button>
          <input type="number" value="1" class="max-w-4 text-center" />
          <button class="btn product-card__controll-btn scale-150 border">+</button>
        </div>

        <!-- btn buy -->
        <UiButton
          variant="dark"
          class="product-card__buy cursor-pointer flex items-center self-end w-max scale-70 group"
        >
          <!-- <span class="relative z-2 group-hover:text-white">Добавить </span> -->
          <Icon
            class="relative z-2 group-hover:text-white"
            icon="bitcoin-icons:cart-outline"
            width="32px"
            height="32px"
          />
          <!-- <div
            class="absolute left-1/2 translate-[-50%,-50%] z-1 h-2 w-2 rounded-full transition bg-white"
          ></div> -->
        </UiButton>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { UNIT_INFO, type Product } from '@/types/products'
import { toRefs } from 'vue'
import { Icon } from '@iconify/vue'
import UiButton from '@/components/ui/UiButton.vue'

type productCardVariant = 'cart' | 'favorite' | 'default'

const props = defineProps<{
  product: Product
  showDesc: boolean
  variant: productCardVariant
}>()

const { title, effectivePrice, imageUrl, isAvailable, description, unit } = toRefs(props.product)
const ruUnit = UNIT_INFO[unit.value]
</script>

<style scoped lang="scss">
.product-card__controll-btn {
  width: 1rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}

input {
  outline: none;
  &:focus {
    border-bottom: 1px solid black;
  }
}
</style>
