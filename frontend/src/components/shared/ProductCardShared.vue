<template>
  <article
    v-if="props.product"
    class="product-card flex gap-3 relative rounded-2xl shadow transition shadow-neutral-800/70 hover overflow-hidden max-w-[25rem]"
    :class="{
      'flex-row max-h-[7rem] w-full ': variant === 'cart',
      'h-[26rem] max-w-[20rem]  flex-col': variant === 'default' || variant === 'favorite',
    }"
  >
    <div
      class="product-card__img-container group min-h-0 flex-2/3 overflow-hidden !rounded-2xl"
      :class="{ 'basis-[5.4rem] !shrink-0 grow-0 !flex-1/3': variant === 'cart' }"
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
        @click="toggleFavorite"
      >
        <Icon
          :icon="
            isFavorite
              ? 'material-symbols-light:favorite'
              : 'material-symbols-light:favorite-outline'
          "
          width="30px"
          height="30px"
          :style="{ color: isFavorite ? 'red' : 'black' }"
        />
      </button>

      <div
        class="flex !flex-col gap-3 justify-between"
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
          <span class="text-nowrap">/ {{ ruUnit.label }}</span>
        </p>

        <div class="flex gap-3 justify-between">
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
              <p v-if="variant === 'cart'" class="product-card__subtotal text-nowrap font-black">
                {{ subtotal }} ₽
              </p>
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
          <button
            class="product-card__delete cursor-pointer"
            v-if="variant === 'cart'"
            @click="cart.remove(_id)"
          >
            <Icon
              icon="material-symbols-light:delete-outline"
              width="30px"
              height="30px"
              style="color: #000"
            />
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { UNIT_INFO, type Product } from '@/types/products'
import { computed, toRefs } from 'vue'
import { Icon } from '@iconify/vue'
import UiButton from '@/components/ui/UiButton.vue'
import { useCart, type CartLine } from '@/stores/cart'
import { useFavorite } from '@/stores/useFavorite'

type productCardVariant = 'cart' | 'favorite' | 'default'

const props = defineProps<{
  product: Product
  showDesc: boolean
  variant: productCardVariant
  subtotal?: number
  line?: CartLine
}>()

const { title, effectivePrice, description, unit, _id } = toRefs(props.product)
const ruUnit = UNIT_INFO[unit.value]

const storeFavorite = useFavorite()
const cart = useCart()

const isFavorite = computed(() => storeFavorite.isFavorite(_id.value))
const qty = computed({
  get: () => {
    if (props.variant === 'cart') {
      return props.line?.qty
    }
    return cart.lines[_id.value]?.qty ?? 0
  },
  set: (val: number) => {
    if (props.variant === 'cart' && props.line) {
      cart.setQty(props.line.productId, Math.max(0, val))
    }
    cart.setQty(_id.value, Math.max(0, val))
  },
})

// *** toggle favorite

function toggleFavorite() {
  if (isFavorite.value) {
    storeFavorite.removeFromFavorite(_id.value)
  } else {
    storeFavorite.addToFavorite(props.product)
  }
}

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
