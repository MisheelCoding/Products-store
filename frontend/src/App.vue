<template>
  <div>
    <HeaderShared />
    <router-view></router-view>
    <FooterShared />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderShared from '@/components/shared/HeaderShared.vue'
import FooterShared from '@/components/shared/FooterShared.vue'
</script>

<style scoped></style>
