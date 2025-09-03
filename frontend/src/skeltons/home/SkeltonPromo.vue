<template>
  <div class="container flex flex-wrap gap-10 items-stretch">
    <article
      v-for="i in count"
      :key="i"
      class="flex-1 min-w-[250px] animate-pulse bg-gray-300 rounded-lg"
    >
      <div class="w-full aspect-[16/9] bg-gray-300"></div>
      <!-- оверлей или текст -->
    </article>
  </div>
</template>

<script setup lang="ts">
defineProps<{ count: number }>()
</script>
