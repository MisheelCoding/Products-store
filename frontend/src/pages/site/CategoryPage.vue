<script setup lang="ts">
const props = defineProps<{ id: string }>() // благодаря props: true
</script>

<template>
  <section class="container py-10">
    <h1 class="text-2xl font-bold">Категория: {{ props.id }}</h1>
    <!-- тут уже грузишь товары по категории -->
  </section>
</template>
