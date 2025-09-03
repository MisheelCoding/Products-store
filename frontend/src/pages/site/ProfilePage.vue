<template>
  <div class="profile container">
    <div class="profile__head">
      <h1>Профиль</h1>
      <p>Все детали профиля у вас тут</p>
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

  <router-link to="auth/login">Login</router-link>
  <button @click="auth.logout()" class="ml-10">logout</button>
</template>

<script setup lang="ts">
import avatarImg from '@/assets/img/optimized/avatar-exapmle.webp'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<style scoped>
.profile__body {
  grid-template-columns: 30% 70%;
}
</style>
