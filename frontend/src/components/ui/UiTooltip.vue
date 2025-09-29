<template>
  <div class="relative inline-block group tooltip-container">
    <!-- слот для элемента  к которому прикреплён тултип -->
    <slot />

    <!-- тултип -->
    <div
      class="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block bg-black text-white text-xs px-3 py-2 z-50 tooltip"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped>
.tooltip {
  clip-path: polygon(55% 7%, 100% 7%, 100% 100%, 0 100%, 0 7%, 45% 7%, 50% 0);
  max-width: 25rem;
  min-width: 18rem;
}
</style>
