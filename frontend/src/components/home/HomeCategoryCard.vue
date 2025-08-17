<template>
  <div>
    <img :src="image" :alt="id" />
    {{ title }}
    <router-link :to="link"></router-link>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

interface Props {
  title: string
  link: string
  id: string
  image: string
}
const props = defineProps<{ category: Props }>()
const { id, image, link, title } = toRefs(props.category)
</script>

<style scoped></style>
