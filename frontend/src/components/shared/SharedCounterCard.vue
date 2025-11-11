<template>
  <div class="counter-card admin-card p-5 !min-h-[10rem] !w-[20rem] flex flex-col justify-between">
    <div class="counter-card__header">
      <h3 class="counter-card__title admin-title text-sm">{{ title }}</h3>
    </div>
    <p class="counter-card__count title">{{ displayValue }}{{ countPlus ? '+' : '' }}</p>
    <div class="counter-card__footer flex gap-3">
      <slot name="icon"></slot>
      <p class="counter-card__suptitle text-xs">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    count: number | string
    countPlus?: boolean
    subtitle: string
    subplus?: boolean
    duration?: number //в милесекундах
  }>(),
  {
    countPlus: false,
    subplus: true,
  },
)

const displayValue = ref(0)
const startCount = () => {
  const start = 0
  const end = props.count
  const duration = props.duration ?? 1000
  const startTime = performance.now()

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    if (elapsed < duration) {
      displayValue.value = Math.round((end * elapsed) / duration)
      requestAnimationFrame(animate)
    } else {
      displayValue.value = end
    }
  }

  requestAnimationFrame(animate)
}

onMounted(() => {
  startCount()
})

// если value динамическое

watch(
  () => props.count,
  () => startCount(),
)
</script>

<style scoped></style>
