<template>
  <button
    @click="toggleTheme"
    class="mode relative flex items-center justify-between rounded-full cursor-pointer select-none"
  >
    <!-- текст dark -->
    <span
      class="mode__dark flex-1 text-center text-xs uppercase"
      :class="theme === 'dark' ? 'opacity-100' : 'opacity-40 translate-x-[-40px]'"
    >
      Dark
    </span>

    <!-- ползунок -->
    <span
      class="mode__btn rounded-full absolute right-2"
      :class="theme === 'dark' ? 'translate-x-1' : '-translate-x-10'"
    ></span>

    <!-- текст light -->
    <span
      class="mode__light flex-1 text-center text-xs uppercase"
      :class="theme === 'light' ? 'opacity-100 ' : 'opacity-40 translate-x-[40px] z-50'"
    >
      Light
    </span>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useMode'

const { toggleTheme, theme } = useTheme()
</script>

<style scoped lang="scss">
.mode {
  width: 5rem;
  height: 2.5rem;
  padding: 0 0.25rem;

  background-color: var(--light-bg);
  color: var(--light-color);
  box-shadow:
    inset 4px 4px 8px rgba(0, 0, 0, 0.6),
    inset -4px -4px 8px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  transition: background-color 400ms linear;
  .mode__dark,
  .mode__light {
    transition: translate 600ms ease;
  }
  .mode__btn {
    width: 1.8rem;
    height: 1.8rem;
    background: linear-gradient(145deg, #dadada, #eaeaea);
    box-shadow:
      2px 2px 6px rgba(36, 36, 36, 0.825),
      -2px -2px 6px rgba(131, 131, 131, 0.697);
    transition: all 600ms ease;
  }
}

html.dark .mode {
  background-color: var(--main-bg);
  color: var(--main-color);
  box-shadow:
    inset 4px 4px 8px rgba(0, 0, 0, 0.6),
    inset -4px -4px 8px rgba(51, 51, 51, 0.637);

  .mode__btn {
    width: 1.8rem;
    height: 1.8rem;
    background: linear-gradient(145deg, #2e2e2e, #393939);
    box-shadow:
      2px 2px 6px rgba(36, 36, 36, 0.825),
      -2px -2px 6px rgba(131, 131, 131, 0.697);
    transition: all 600ms ease;
  }
}

@keyframes theme-fade {
  0% {
  }
}
</style>
