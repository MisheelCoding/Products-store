<template>
  <div class="profile__email-wrapper">
    <h2>Email</h2>
    <div class="flex items-center gap-2">
      <p class="profile__email">
        {{ auth.user?.email }}
      </p>
      <UiTooltip>
        <Icon
          icon="medical-icon:i-information-us"
          class="text-black/20 hover:text-black transition cursor-help"
          width="20px"
          height="20px"
        />
        <template #content> Если хотите поменять email обратитесь поддержку </template>
      </UiTooltip>
      <b :class="auth.user?.verified ? 'text-green-500' : 'text-red-500'">{{
        auth.user?.verified ? 'подвержден' : 'не подвержден'
      }}</b>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { Icon } from '@iconify/vue'
import UiTooltip from '@/components/ui/UiTooltip.vue'

const auth = useAuthStore()
</script>

<style scoped></style>
