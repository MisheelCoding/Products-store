<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const username = ref<string>('')
const password = ref<string>('')
const showPwd = ref<boolean>(false)

async function submit() {
  try {
    await auth.login(username.value, password.value)
    // для быстрой проверки:
    console.log('Логин ок:', auth.user)
  } catch {
    // ошибка уже в auth.error
  }
}
</script>

<template>
  <form @submit.prevent="submit" style="max-width: 360px; display: grid; gap: 8px">
    <h3>Вход</h3>

    <input v-model="username" type="text" placeholder="username" autocomplete="username" required />

    <div style="display: flex; gap: 6px">
      <input
        v-model="password"
        :type="showPwd ? 'text' : 'password'"
        placeholder="Пароль"
        autocomplete="current-password"
        required
        style="flex: 1"
      />
      <button type="button" @click="showPwd = !showPwd">
        {{ showPwd ? 'Скрыть' : 'Показать' }}
      </button>
    </div>

    <button type="submit" :disabled="auth.loading">
      {{ auth.loading ? 'Вхожу…' : 'Войти' }}
    </button>

    <p v-if="auth.error" style="color: #d33; margin: 0">
      {{ auth.error }}
    </p>

    <p v-if="auth.user" style="color: #2b7">
      Привет, {{ auth.user.username ?? auth.user.username }}!
    </p>
  </form>
</template>

<style scoped>
input,
button {
  padding: 8px;
}
button {
  cursor: pointer;
}
</style>
