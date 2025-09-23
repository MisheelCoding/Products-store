<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Icon } from '@iconify/vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import UiButton from '@/components/ui/UiButton.vue'
const auth = useAuthStore()

interface FormValues<T = string> {
  username: T
  email: T
  password: T
}

const schema = yup.object({
  username: yup.string().required('Введите имя пользователя или Email').min(3, 'Минимум 3 символа'),
  password: yup.string().required('Введите пароль').min(6, 'Минимум 6 символов'),
  email: yup.string().required('Введите ваш Email').email('это должно быть GMAIl '),
})

const { handleSubmit } = useForm<FormValues>({
  validationSchema: schema,
})

const { value: username, errorMessage: usernameError } = useField('username')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: email, errorMessage: emailError } = useField('email')

const showPwd = ref<boolean>(false)

const submit = handleSubmit(async (values) => {
  try {
    await auth.register(values.username, values.email, values.password)
    // для быстрой проверки:
    console.log('Логин ок:', auth.user)
  } catch (e) {
    // ошибка уже в auth.error
    console.log('err', e)
  }
})
</script>

<template>
  <div class="container relative">
    <form class="flex flex-col gap-5 justify-center items-center min-h-[85svh]" @submit="submit">
      <h1>Вход</h1>
      <div class="div flex flex-col gap-5 !max-w-[22rem] w-full">
        <input
          class="auth-inp"
          v-model="username"
          type="text"
          placeholder="username"
          autocomplete="username"
        />
        <p class="text-red-500 min-h-[1.1875rem] error">
          <span v-if="usernameError">{{ usernameError }}</span>
        </p>
        <input
          class="auth-inp"
          v-model="email"
          type="text"
          placeholder="Введите ваш gmail"
          autocomplete="email"
        />
        <p class="text-red-500 min-h-[1.1875rem] error">
          <span v-if="emailError">{{ emailError }}</span>
        </p>

        <div class="flex gap-3 relative items-center">
          <input
            class="auth-inp flex-1"
            v-model="password"
            :type="showPwd ? 'text' : 'password'"
            placeholder="Пароль"
            autocomplete="current-password"
          />
          <button class="absolute right-0" type="button" @click="showPwd = !showPwd">
            <Icon
              :icon="showPwd ? 'weui:eyes-off-outlined' : 'weui:eyes-on-outlined'"
              width="25px"
              height="25px"
              style="color: #000"
            />
          </button>
        </div>
        <p class="text-red-500 min-h-[1.1875rem] error">
          <span v-if="passwordError">{{ passwordError }}</span>
        </p>

        <ui-button class="h-[3rem]" variant="dark" type="submit" :disabled="auth.loading">
          {{ auth.loading ? 'Вхожу…' : 'Войти' }}
        </ui-button>

        <p v-if="auth.error" style="color: #d33; margin: 0">
          {{ auth.error }}
        </p>

        <p v-if="auth.user" style="color: #2b7">
          Привет, {{ auth.user.username ?? auth.user.username }}!
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
input,
button {
  padding: 8px;
}
button {
  cursor: pointer;
}

.error {
  font-size: 0.8rem;
}
</style>
