<template>
  <div class="profile-phone">
    <h2 class="profile-phone__title">Телефон</h2>
    <UiEditField
      :data="auth.user?.phone ? auth.user?.phone : null"
      :placeholder="'Введите ваш номер'"
      @save="savePhone($event)"
      @delete="deletePhone"
    >
      <template #btn-name>+ Добавить номер</template>
    </UiEditField>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import UiEditField from '@/components/ui/UiEditField.vue'
import { useProfileStore } from '@/stores/profile'
const auth = useAuthStore()
const profile = useProfileStore()
const savePhone = async (data: string | null) => {
  if (!data) return
  try {
    await profile.saveNumber(data)
  } catch (e) {
    throw e
  }
}
const deletePhone = async () => {
  try {
    await profile.deleteNumber()
  } catch (e) {
    throw e
  }
}
</script>

<style scoped></style>
