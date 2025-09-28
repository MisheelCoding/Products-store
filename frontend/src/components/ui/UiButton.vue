<!-- UiButton.vue -->
<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    class="ui-button px-5 py-1 transition cursor-pointer overflow-hidden relative flex items-center justify-center"
    :class="[variantClass, sizeClass, styleClass]"
    :type="to ? undefined : type"
    :aria-label="ariaLabel"
    :disabled="disabled"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  to?: RouteLocationRaw
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
  variant?: 'dark' | 'white' | 'outline'
  size?: 'auto' | 'md' | 'lg'
  styleBtn?: 'rounded' | 'rounded-2xl' | 'rounded-full' | 'notRounded'
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'outline',
  size: 'auto',
  styleBtn: 'rounded-full',
  disabled: false,
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'dark':
      return 'bg-black text-white hover:bg-black/70 dark:bg-white dark:text-black dark:hover:bg-white/70'
    case 'white':
      return 'bg-white text-black hover:bg-white/70 dark:bg-black dark:text-white dark:hover:bg-black/70'
    default:
      return 'bg-transparent border-2 text-black border-black dark:text-white dark:border-white'
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'md':
      return '!max-w-[12.5rem] h-[2.50rem]'
    case 'lg':
      return '!max-w-[15.625rem] h-[3rem]'
    default:
      return 'w-auto h-[3rem]'
  }
})

const styleClass = computed(() => {
  switch (props.styleBtn) {
    case 'rounded':
      return 'rounded '
    case 'rounded-2xl':
      return 'rounded-2xl'
    case 'rounded-full':
      return 'rounded-full'
    default:
      return ''
  }
})
</script>
