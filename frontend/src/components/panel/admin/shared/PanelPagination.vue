<template>
  <div class="panel-pagination flex gap-4 justify-center mt-5">
    <button
      :disabled="currentPage === 1"
      class="panel-pagination__controll prev"
      @click="emit('change', currentPage - 1)"
    >
      <Icon icon="formkit:left" width="13.13px" height="30px" style="color: #fff" />
    </button>
    <button
      v-for="p in items"
      :key="p"
      @click="emit('change', Number(p))"
      class="panel-pagination__page"
      :class="[
        currentPage === p ? 'current-active-page' : '',
        typeof p === 'string' ? 'panel-pagination__ellipsis' : '',
      ]"
    >
      <span class="">{{ p }}</span>
    </button>
    <button
      class="panel-pagination__controll next"
      :disabled="currentPage === Math.max(...items.filter((i) => typeof i === 'number'))"
      @click="emit('change', currentPage + 1)"
    >
      <Icon icon="formkit:right" width="13.13px" height="30px" style="color: #fff" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  items: (number | string)[]
  currentPage: number
}>()

const emit = defineEmits<{
  (e: 'change', page: number): void
}>()
</script>

<style scoped lang="scss">
.panel-pagination {
  &__controll {
    cursor: pointer;
    &:disabled {
      opacity: 20%;
    }
  }
  &__page {
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
    transition: all 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    z-index: 2;

    // &:not(.panel-pagination__ellipsis):before {
    //   content: '';
    //   z-index: 1;
    //   position: absolute;
    //   top: 2px;
    //   left: -2px;
    //   width: 0.2rem;
    //   height: 2.5rem;
    //   border-radius: 6px;
    //   box-shadow: 0 4px 8px rgba(117, 117, 117, 0.607);

    //   pointer-events: none; /* чтобы не мешать клику */
    // }
    // &:not(.panel-pagination__ellipsis)::after {
    //   content: '';
    //   z-index: 1;
    //   position: absolute;
    //   bottom: -2px;
    //   left: -2px;
    //   width: 2.5rem;
    //   height: 0.2rem;
    //   border-radius: 6px;
    //   box-shadow: 0 4px 8px rgb(117, 117, 117, 0.607);

    //   pointer-events: none; /* чтобы не мешать клику */
    // }
    > span {
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 1;
      height: max-content;
    }
    &.panel-pagination__ellipsis {
      align-self: center;
      pointer-events: none;

      > span {
        margin-top: 1.7rem;
      }
    }

    &:not(.panel-pagination__ellipsis) {
      cursor: pointer;
      box-shadow:
        inset 0px 0px 5px 5px rgba(255, 255, 255, 0.1),
        inset 0 2px 4px rgba(255, 255, 255, 0.1);
    }

    &:not(.panel-pagination__ellipsis):hover {
      box-shadow:
        0px 0px 5px 5px rgba(255, 255, 255, 0.1),
        0 2px 4px rgba(255, 255, 255, 0.1);

      transform: translateY(-2px);
    }
  }
}
.panel-pagination__page.current-active-page {
  background-color: var(--fg);
  color: var(--bg);
  box-shadow: inset 0 2px 10px 3px rgba(0, 0, 0, 0.658);
  transition: all 400ms ease;
}
</style>
