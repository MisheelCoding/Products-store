<template>
  <div class="profile-email">
    <h2 class="my-4">Email</h2>
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <p class="profile-email__info">
          {{ profile?.email }}
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
        <b :class="profile?.verified ? 'text-green-500' : 'text-red-500'">{{
          profile?.verified ? 'подвержден' : 'не подвержден'
        }}</b>
      </div>
      <UiButton
        v-if="!profile?.verified"
        variant="dark"
        :disabled="profileStore.timer > 0"
        class="profile-email__button disabled:opacity-60 disabled:cursor-not-allowed self-start"
        @click="resendEmailVerifacation"
      >
        Подвердить почту
      </UiButton>
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import UiTooltip from '@/components/ui/UiTooltip.vue'
import UiButton from '@/components/ui/UiButton.vue'
import api from '@/scripts/api'
import { useProfileStore } from '@/stores/profile'
import { ref } from 'vue'
const profileStore = useProfileStore()
const { profile } = profileStore
const message = ref('')

const resendEmailVerifacation = async () => {
  profileStore.startTimer(60)
  message.value = 'Письмо отправлено! Проверьте почту 📧'
  try {
    await api.post(
      'api/auth/resend-verification-code',
      { email: profile?.email },
      { withCredentials: true },
    )
  } catch (e) {
    message.value = 'ошибка попробуйте еще раз'
    throw e
  }
}
</script>

<style scoped></style>
