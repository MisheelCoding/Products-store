<template>
  <div>
    <HeaderShared />
    <router-view></router-view>
    <FooterShared />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'

import { defineAsyncComponent } from 'vue'

const HeaderShared = defineAsyncComponent(() => import('@/components/shared/HeaderShared.vue'))
const FooterShared = defineAsyncComponent(() => import('@/components/shared/FooterShared.vue'))
</script>

<style scoped></style>
