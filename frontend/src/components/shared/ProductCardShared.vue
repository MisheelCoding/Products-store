<template>

  <article
    v-if="props.product"
    class="product-card flex gap-3 relative rounded-2xl shadow transition shadow-neutral-800/70 hover overflow-hidden"
    :class="{
      'flex-row max-h-[7rem] w-full': variant === 'cart',
      ' h-[26rem] max-w-[20rem]  flex-col': variant === 'default' || variant === 'favorite',
    }"
  >
    <div
      class="product-card__img-container group min-h-0 flex-2/3 overflow-hidden !rounded-2xl"
      :class="{ '!flex-1/3 ': variant === 'cart' }"
    >
      <img
        class="product-card__img w-full h-full object-cover group-hover:scale-110 transition"
        src="https://res.cloudinary.com/djb8hjpdl/image/upload/v1757456157/pexels-alexy-almond-3756480_csyeer.webp "
        :alt="title"
        loading="lazy"
        fetchpriority="high"
      />
    </div>
    <div
      class="product-card__body p-2 flex-1/3 min-h-0 flex flex-col justify-between gap-2"
      :class="{ '!flex-2/3 ': variant === 'cart' }"
    >
      <h2 class="text-[.6rem]">{{ title }}</h2>
      <p class="product-card__desc" v-if="description && showDesc">{{ description }}</p>

      <button
        v-if="variant === 'default' || variant === 'favorite'"
        class="product-card__favorite cursor-pointer absolute right-2 top-2"
      >
        <Icon
          icon="material-symbols-light:favorite"
          width="30px"
          height="30px"
          style="color: red"
        />
      </button>

      <div
        class="flex gap-3"
        :class="{
          'flex-row': variant === 'cart',
          'flex-col': variant === 'default' || variant === 'favorite',
        }"
      >
        <p class="product-card__price flex gap-1 text-[1.1rem]">
          <span :class="{ 'text-red-500': effectivePrice?.old }" class="font-bold">{{
            effectivePrice?.current
          }}</span>
          <span class="line-through opacity-30" v-if="effectivePrice?.old">{{
            effectivePrice?.old
          }}</span>
          <span>/ {{ ruUnit.label }}</span>
        </p>

        <div
          class="product-card__footer flex justify-between items-center pl-3"
          v-if="variant === 'cart' || variant === 'default'"
        >
          <div class="product-card__controlls flex justify-center items-center gap-3">
            <button class="btn product-card__controll-btn scale-150 border" @click="onDec()">
              -
            </button>
            <input type="number" v-model.number="qty" min="0" class="max-w-4 text-center" />
            <button class="btn product-card__controll-btn scale-150 border" @click="onInc()">
              +
            </button>
          </div>

          <UiButton
            v-if="variant === 'default'"
            variant="dark"
            class="product-card__buy cursor-pointer flex items-center self-end w-max scale-70 group"
            @click="onAdd"
          >
            <Icon
              class="relative z-2 group-hover:text-white"
              icon="bitcoin-icons:cart-outline"
              width="32px"
              height="32px"
            />
          </UiButton>
        </div>
      </div>
    </div>
  </article>

</template>

<script setup lang="ts">
import { UNIT_INFO, type Product } from '@/types/products'
import { computed, toRefs, watch } from 'vue'
import { Icon } from '@iconify/vue'
import UiButton from '@/components/ui/UiButton.vue'
import { useCart } from '@/stores/cart'

type productCardVariant = 'cart' | 'favorite' | 'default'

const props = defineProps<{
  product: Product
  showDesc: boolean
  variant: productCardVariant
}>()


const { title, effectivePrice, description, unit, _id } = toRefs(props.product)
const ruUnit = UNIT_INFO[unit.value]

const cart = useCart()

const qty = computed({
  get: () => cart.lines[_id.value]?.qty ?? 0,
  set: (val: number) => cart.setQty(_id.value, Math.max(0, val)),
})

// Синхронизация с корзиной

function onInc() {
  cart.add(_id.value)
  // qty.value = cart.lines[_id.value]?.qty ?? 1
}

function onDec() {
  cart.dec(_id.value)
  // qty.value = cart.lines[_id.value]?.qty ?? 0
}

// function onQtyChange() {
//   cart.setQty(_id.value, Math.max(0, qty.value))
//   // qty.value = cart.lines[_id.value]?.qty ?? 0
// }

function onAdd() {
  cart.add(_id.value)
  // qty.value = cart.lines[_id.value]?.qty ?? 1
}
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
