<template>
  <div class="profile container min-h-screen">
    <div class="profile__logged-in" v-if="auth.isAuthenticated">
      <div class="profile__head flex justify-between items-center mb-5">
        <div class="flex flex-col">
          <h1>Профиль</h1>
          <p>Все детали профиля у вас тут</p>
        </div>

        <div class="profile__btns flex gap-1">
          <ui-button variant="dark" :to="{ name: 'admin' }" class="ml-10">Админ панель</ui-button>
          <ui-button variant="white" @click="auth.logout()" class="border">Выйти</ui-button>
        </div>
      </div>
      <!--  -->
      <div class="profile__body grid w-full gap-5">
        <div
          class="profile__col border p-5 border-gray-500 rounded-2xl flex flex-col gap-5 justify-center items-center"
        >
          <h2 class="profile__username">{{ user?.username }}</h2>
          <div class="avatar overflow-hidden relative rounded-2xl">
            <div
              class="avatar__layout bg-gray-500 w-[7rem] h-[7rem] flex justify-center items-center rounded-full"
            >
              <!-- <img :src="avatarImg" class="avatar__img rounded-full w-full h-full" />  -->
              <img
                v-if="avatarUrl"
                :src="avatarUrl"
                alt="Фото профиля"
                class="avatar__img rounded-full w-full h-full object-cover"
              />
              <img
                v-else
                :src="avatarImg"
                alt="Фото по умолчанию"
                class="avatar__img rounded-full w-full h-full object-cover"
              />
              <div v-if="profileStore.isAvatarLoading" class="avatar__loading">Загрузка...</div>
            </div>
          </div>
        </div>
        <div class="profile__col border p-5 border-gray-500 rounded-2xl w-full flex flex-col gap-5">
          <ProfileAdresses></ProfileAdresses>
          <ProfileEmail />
          <ProfilePhone />
          <ProfileDateInfo />
        </div>
      </div>
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
import ProfileAdresses from '@/components/profile/ProfileAddresses.vue'
import ProfileDateInfo from '@/components/profile/ProfileDateInfo.vue'
import ProfileEmail from '@/components/profile/ProfileEmail.vue'
import ProfilePhone from '@/components/profile/ProfilePhone.vue'

import UiButton from '@/components/ui/UiButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profile'
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'

const auth = useAuthStore()
const profileStore = useProfileStore()
const { user } = storeToRefs(auth)

// Безопасное получение данных из profileStore
const avatarUrl = computed(() => profileStore.avatarUrl)
const addresses = computed(() => profileStore.addresses)

onMounted(async () => {
  console.log(avatarUrl.value)
  try {
    // Инициализируем данные профиля
    await profileStore.ensureAvatar() // Загружаем аватар
    await profileStore.getAddresses() // Загружаем адреса

    // Запускаем автообновление аватара
    profileStore.startAvatarAutoRefresh()

    console.log('Avatar URL:', avatarUrl.value)
    console.log('Addresses:', addresses.value)
  } catch (error) {
    console.error('Ошибка инициализации профиля:', error)
  }
})
</script>

<style scoped>
.profile__body {
  grid-template-columns: repeat(1fr);
}
@media (min-width: 850px) {
  .profile__body {
    grid-template-columns: 30% calc(70% - 1.25rem);
  }
}
</style>
