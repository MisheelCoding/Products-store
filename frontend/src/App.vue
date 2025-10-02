<template>
  <div>
    <HeaderShared v-if="!isPanel" />
    <router-view></router-view>
    <FooterShared v-if="!isPanel" />
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'

import { computed, defineAsyncComponent } from 'vue'

const HeaderShared = defineAsyncComponent(() => import('@/components/shared/HeaderShared.vue'))
const FooterShared = defineAsyncComponent(() => import('@/components/shared/FooterShared.vue'))

const route = useRoute()

const isPanel = computed(() => route.path.startsWith('/admin') || route.path.startsWith('/courier'))
</script>

<style scoped></style>
