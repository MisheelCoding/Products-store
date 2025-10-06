<template>
  <div class="ui-search clear-start relative">
    <input
      :class="[getSizeClass(props.size), getBorderRadius(props.radius)]"
      @change="emit('on-input')"
      class="ui-search__inp px-2 w-full"
      type="text"
      v-model="model"
      placeholder="Поиск..."
    />
    <Icon
      class="absolute right-0"
      icon="material-symbols-light:search-rounded"
      width="30px"
      height="30px"
      style="color: #000"
    />
  </div>
</template>

<script setup lang="ts">
import type { UiBorderRadius, UiSize } from '@/types/common/ui'
import { Icon } from '@iconify/vue'
import { defineModel, defineEmits, defineProps } from 'vue'
import { useUi } from '@/composables/shared/useUi'

const model = defineModel<string>({ default: '' })
const { getSizeClass, getBorderRadius } = useUi()
const emit = defineEmits<{
  (e: 'on-input'): void
}>()

const props = withDefaults(
  defineProps<{
    size?: UiSize
    radius?: UiBorderRadius
  }>(),
  {
    radius: 'default',
    size: 'default',
  },
)
</script>

<style scoped lang="scss">
.ui-search {
  &__inp {
    border: 1px solid var(--fg);
  }
}
</style>
