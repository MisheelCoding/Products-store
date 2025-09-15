<template>
  <div class="profile container min-h-screen">
    <div class="profile__isLoggin" v-if="auth.isAuthenticated">
      <div class="profile__head flex justify-between items-center mb-5">
        <div class="flex flex-col">
          <h1>Профиль</h1>
          <p>Все детали профиля у вас тут</p>
        </div>
        <ui-button variant="dark" @click="auth.logout()" class="ml-10">logout</ui-button>
      </div>
      <!--  -->
      <form class="profile__body grid gap-5">
        <div
          class="profile__col border p-5 border-gray-500 rounded-2xl flex flex-col justify-center items-center"
        >
          <h2 class="profile__username">Mila</h2>
          <div class="avatar overflow-hidden relative rounded-2xl">
            <div
              class="avatar__layout bg-gray-500 w-[7rem] h-[7rem] flex justify-center items-center rounded-full"
            >
              <img :src="avatarImg" class="avatar__img rounded-full w-full h-full" />
            </div>
          </div>
        </div>
        <div class="profile__col border p-5 border-gray-500 rounded-2xl">
          <!-- тут поля с модели  -->
        </div>
      </form>
    </div>
    <div v-else class="flex flex-col gap-2 items-center justify-center py-20 text-center">
      <Icon icon="mdi:account-off" width="100px" height="100px" style="color: #ccc" />
      <h2 class="text-lg font-semibold mb-2">Вы не вошли в аккаунт</h2>
      <p class="text-gray-600 mb-6 max-w-xs">
        Войдите или зарегистрируйтесь, чтобы получить доступ к истории заказов, сохранённым адресам
        и картам.
      </p>
      <div class="flex gap-4">
        <UiButton variant="dark" :to="{ name: 'login' }">Войти</UiButton>
        <UiButton variant="white" :to="{ name: 'register' }">Регистрация</UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import avatarImg from '@/assets/img/optimized/avatar-exapmle.webp'
import UiButton from '@/components/ui/UiButton.vue'
import { useAuthStore } from '@/stores/auth'
import { Icon } from '@iconify/vue'
const auth = useAuthStore()
</script>

<style scoped>
.profile__body {
  grid-template-columns: 30% 70%;
}
</style>
