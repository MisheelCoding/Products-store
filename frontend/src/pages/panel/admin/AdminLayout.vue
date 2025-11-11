<template>
  <div class="panel w-full fixed bg-[var(--admin-bg)] text-[var(--admin-color)]">
    <div class="panel__wrapper flex min-h-screen">
      <!-- Сайдбар -->
      <PanelSidebar v-if="!isMobile" :links="PANEL_ADMIN_LINKS" />

      <!-- Основной контент -->
      <main ref="blockRef" class="panel__content grow min-w-[50%] p-4 relative">
        <!-- Overlay с размерами -->
        <div
          class="absolute top-2 right-2 bg-gray-600 text-white text-xs px-2 py-1 rounded pointer-events-none"
        >
          {{ width }} × {{ height }}
        </div>

        <RouterView />
      </main>

      <!-- Детали панели -->
      <PanelDetails />
    </div>
    <Teleport to="body">
      <PanelSidebar v-if="isMobile" :links="PANEL_ADMIN_LINKS" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterView } from 'vue-router'
import PanelSidebar from '@/pages/panel/shared/PanelSidebar.vue'
import PanelDetails from '@/pages/panel/shared/PanelDetails.vue'
import { PANEL_ADMIN_LINKS } from '@/constants/admin'
import { useIsMobile } from '@/composables/shared/useMobile'
const { isMobile } = useIsMobile()
// Ref на блок
document.documentElement.classList.add('dark')
const blockRef = ref<HTMLElement | null>(null)
// Ширина и высота
const width = ref(0)
const height = ref(0)

// ResizeObserver
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      width.value = Math.round(entry.contentRect.width)
      height.value = Math.round(entry.contentRect.height)
    }
  })

  if (blockRef.value) {
    resizeObserver.observe(blockRef.value)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver && blockRef.value) {
    resizeObserver.unobserve(blockRef.value)
  }
})
</script>

<style scoped>
.panel__wrapper {
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.panel__content {
  position: relative; /* важно для overlay */
  container: admin-content / inline-size;
}
</style>
