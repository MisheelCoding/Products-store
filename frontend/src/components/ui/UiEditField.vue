<template>
  <div class="editing-field">
    <div class="editing-field__form" v-if="editing">
      <input
        class="editing-field__input inp"
        type="text"
        v-model="localField"
        :placeholder="placeholder"
      />

      <div class="editing-field__btns flex gap-2 my-3 justify-end">
        <UiButton
          size="md"
          style-btn="rounded-2xl"
          class="editing-field__btn editing-field__btn--cancel"
          @click="editing = false"
          >Отменить</UiButton
        >

        <UiButton
          type="button"
          size="md"
          variant="dark"
          style-btn="rounded-2xl"
          class="editing-field__btn editing-field__btn--save"
          @click="save"
          >Сохранить</UiButton
        >
      </div>
    </div>

    <div v-else class="editing-field__display">
      <div class="flex gap-3 justify-between" v-if="props.data !== null">
        <span>{{ props.data }}</span>
        <div class="editing-field__btns flex gap-2">
          <button class="btn editing-field--delete" title="Удалить" @click="emit('delete')">
            <Icon
              icon="material-symbols-light:delete-outline-rounded"
              width="30px"
              height="30px"
              style="color: #000"
            />
          </button>
          <button
            class="btn editing-field__btn--edit"
            title="Редактировать"
            type="button"
            @click="editing = true"
          >
            <Icon icon="iconamoon:edit-thin" width="30px" height="30px" style="color: #000" />
          </button>
        </div>
      </div>
      <button
        v-if="props.data === null && !editing"
        type="button"
        class="editing-field__add-btn text-green-700 btn"
        @click="editing = !editing"
      >
        <slot name="btn-name"></slot>
        <!-- + Добавить номер -->
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  data: string | null
  placeholder: string
}>()

const emit = defineEmits<{
  (e: 'save', value: string | null): void
  (e: 'delete'): void
}>()

const localField = ref<null | string>(props.data)
const editing = ref(false)

watch(
  () => props.data,
  (val) => {
    localField.value = val
  },
)

function save() {
  emit('save', localField.value)
  editing.value = false
}
</script>

<style scoped></style>
