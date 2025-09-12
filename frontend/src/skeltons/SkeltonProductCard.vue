<template>
  <article
    class="product-card flex gap-3 relative rounded-2xl shadow animate-pulse bg-neutral-200 overflow-hidden"
    :class="{
      'flex-row max-h-[7rem] w-full': variant === 'cart',
      'h-[26rem] max-w-[20rem] flex-col': variant === 'default' || variant === 'favorite',
    }"
  >
    <div
      class="product-card__img-container min-h-0 flex-2/3 bg-neutral-300 !rounded-2xl"
      :class="{ '!flex-1/3 ': variant === 'cart' }"
    ></div>

    <div
      class="product-card__body p-2 flex-1/3 min-h-0 flex flex-col justify-between gap-2"
      :class="{ '!flex-2/3 ': variant === 'cart' }"
    >
      <div class="h-4 w-3/4 bg-neutral-300 rounded"></div>
      <!-- title skeleton -->
      <div class="h-3 w-full bg-neutral-300 rounded mt-1" v-if="showDesc"></div>
      <!-- desc skeleton -->

      <div
        class="flex gap-3 mt-auto"
        :class="{
          'flex-row items-center': variant === 'cart',
          'flex-col': variant === 'default' || variant === 'favorite',
        }"
      >
        <div class="h-5 w-16 bg-neutral-300 rounded"></div>
        <!-- price skeleton -->
        <div class="flex gap-2" v-if="variant !== 'favorite'">
          <div class="h-6 w-6 bg-neutral-300 rounded"></div>
          <!-- minus button -->
          <div class="h-6 w-12 bg-neutral-300 rounded"></div>
          <!-- input -->
          <div class="h-6 w-6 bg-neutral-300 rounded"></div>
          <!-- plus button -->
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
type productCardVariant = 'cart' | 'favorite' | 'default'

defineProps<{
  variant: productCardVariant
  showDesc: boolean
}>()
</script>

<style scoped>
.product-card {
  min-width: 320px;
  min-height: 112px;
}
.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
