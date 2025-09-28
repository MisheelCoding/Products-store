<template>
  <div class="verify-email min-h-screen flex justify-center items-center">{{ message }}</div>
</template>

<script setup lang="ts">
import api from '@/scripts/api'
import { useAuthStore } from '@/stores/auth'
import type { User } from '@/types/auth'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const auth = useAuthStore()
const route = useRoute()
const message = ref('Подверждаем ваш Email...')

onMounted(async () => {
  const token = route.query.token as string | undefined
  if (!token) {
    message.value = 'ОШИБКА токен не найден'
    return
  }
  try {
    const res = await api.post(`api/auth/verify-email?token=${token}`, { withCredentials: true })

    if (res.status === 200) {
      message.value = res.data.message || 'Email успешно подтвержден!'
      const { data } = await api.get<User>('api/user/me', { withCredentials: true })
      auth.setUser(data)
    } else {
      message.value = res.data.message || ' Ошибка при подтверждении'
    }
  } catch (e) {
    message.value = 'Ошибка соединения с сервером'
    throw e
  }
})
</script>

<style scoped></style>
