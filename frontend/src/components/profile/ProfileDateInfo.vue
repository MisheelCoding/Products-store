<template>
  <div class="profile-date-info">
    <h2 class="profile-date-info__title my-4">Даты аккаунта</h2>
    <div class="profile-date-info__items flex flex-col sm:flex-row justify-between gap-2">
      <div class="profile-date-info__item">
        <b>Создан: </b>{{ formatDateTime(profile?.createdAt) }}
      </div>
      <div class="profile-date-info__item">
        <b>Обновлен: </b>
        {{ formatDateTime(profile?.updatedAt) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/stores/profile'
import { formatDateTime } from '@/utils/date'
const { profile } = useProfileStore()
</script>

<style></style>
