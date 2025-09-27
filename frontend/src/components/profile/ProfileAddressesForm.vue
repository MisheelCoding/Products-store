<template>
  <div class="address__edit-form">
    <div class="address__edit--item flex gap-3 flex-wrap">
      <input class="inp" type="text" placeholder="Название" v-model="model.label" />
      <input class="inp" type="text" placeholder="Страна" v-model="model.country" />
      <input class="inp" type="text" placeholder="Город" v-model="model.city" />
      <input class="inp" type="text" placeholder="Улица дом кв" v-model="model.addressLine" />
      <input class="inp" type="text" placeholder="Телефон" v-model="model.phone" />
      <input type="checkbox" class="accent-black" id="" v-model="model.isDefault" />
    </div>
    <div class="address__btns flex gap-2 my-3 justify-end">
      <UiButton
        size="md"
        style-btn="rounded-2xl"
        class="address__btn--cancel"
        @click="$emit('cancel')"
        >Отменить</UiButton
      >
      <UiButton
        type="button"
        @click="save"
        size="md"
        variant="dark"
        style-btn="rounded-2xl"
        class="address__btn--save"
        >Сохранить</UiButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
import type { Address } from '@/types/auth'
import { reactive, watch } from 'vue'

const props = defineProps<{
  address: Address
  mode: 'new' | 'edit'
}>()

const emit = defineEmits<{
  (e: 'save', data: Address): void
  (e: 'cancel'): void
}>()

const model: Address = reactive({ ...props.address })

watch(
  () => props.address,
  (val) => Object.assign(model, val),
)

function save() {
  if (
    !model.label.trim() ||
    !model.country.trim() ||
    !model.city.trim() ||
    !model.addressLine.trim() ||
    !model.phone.trim()
  ) {
    console.warn('Заполните все обязательные поля')
    return
  }
  emit('save', { ...model })
}
</script>

<style scoped></style>
