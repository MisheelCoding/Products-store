<template>
  <div>
    <HeaderShared />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderShared from './components/shared/HeaderShared.vue'
</script>

<style scoped></style>
