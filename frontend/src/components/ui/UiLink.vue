<template>
  <router-link :to="to" class="ui-link"><slot></slot></router-link>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  to: string
}>()
</script>

<style scoped>
.ui-link.active {
  background: var(--admin-bg-cart-gradient);
  box-shadow: inset -1px 0px 0px rgba(255, 255, 255, 0.4);

  padding: 1rem 0.6rem;
  border-radius: 1rem;
}

.ui-link.active:hover {
  background: var(--admin-bg-cart-gradient-hover);
}
</style>
