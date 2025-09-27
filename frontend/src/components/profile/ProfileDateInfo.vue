<template>
  <div class="profile-date-info">
    <h2 class="profile-date-info__title my-4">Даты аккаунта</h2>
    <div class="profile-date-info__items flex flex-col sm:flex-row justify-between gap-2">
      <div class="profile-date-info__item">
        <b>Создан: </b>{{ formatDateTime(auth.user?.createdAt) }}
      </div>
      <div class="profile-date-info__item">
        <b>Обновлен: </b>
        {{ formatDateTime(auth.user?.updatedAt) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { formatDateTime } from '@/utils/date'

const auth = useAuthStore()
</script>

<style></style>
