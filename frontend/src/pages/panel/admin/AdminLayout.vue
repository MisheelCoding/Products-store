<template>
  <div class="panel fixed">
    <div class="panel__wrapper flex min-h-svh">
      <PanelSidebar :links="PANEL_ADMIN_LINKS"></PanelSidebar>
      <main class="panel__content grow min-w-[50%] p-4">
        <RouterView />
      </main>
      <PanelDetails />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PANEL_ADMIN_LINKS } from '@/constants/admin'
import PanelSidebar from '@/pages/panel/shared/PanelSidebar.vue'
import { RouterView } from 'vue-router'
import PanelDetails from '@/pages/panel/shared/PanelDetails.vue'
</script>

<style scoped></style>
