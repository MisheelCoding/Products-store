<template>
  <div class="ui-dropdown relative" :class="[getSizeClass(props.size)]" ref="dropdown">
    <div
      class="ui-dropdown__header transition"
      :class="[
        open ? '!border-[var(--admin-color-helper)]' : '',
        getBorderRadius(props.radius),
        isMobile ? 'z-1' : 'z-3',
      ]"
      @click="choose"
    >
      <span class="flex items-center gap-1">
        <template v-if="!Array.isArray(selectedItem) && selectedItem">
          <Icon
            v-if="selectedItem?.icon"
            :height="selectedItem?.iconSize"
            :icon="selectedItem?.icon"
          />
          {{ selectedItem.label }}
        </template>

        <template v-else-if="Array.isArray(selectedItem)">
          <Icon
            v-if="selectedItem[0]?.icon"
            :height="selectedItem[0]?.iconSize"
            :icon="selectedItem[0]?.icon"
          />
          {{ selectedLabel }}
        </template>

        <template v-else>Выберите</template>
      </span>
    </div>
    <Transition name="dropdown">
      <ul class="ui-dropdown__list absolute" v-show="open">
        <li
          class="ui-dropdown__item flex items-center gap-2"
          :class="{ 'ui-dropdown__item--selected': isSelected(item.value) }"
          v-for="item in items"
          @click="(e) => select(item.value, e)"
          :key="String(item.value)"
        >
          <Icon v-if="item.icon" :height="item.iconSize" :icon="item.icon"></Icon
          ><span>{{ item.label }}</span>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useIsMobile } from '@/composables/shared/useMobile'
import { useUi } from '@/composables/shared/useUi'
import type { UiBorderRadius, UiSize } from '@/types/common/ui'
import { Icon } from '@iconify/vue'
import { computed, defineModel, onMounted, onUnmounted, ref } from 'vue'
const { getSizeClass, getBorderRadius } = useUi()
const { isMobile } = useIsMobile()
export type Dropdown<T> = {
  label: string
  value: T
  icon?: string
  iconSize?: string
}
const props = withDefaults(
  defineProps<{
    items: Dropdown<unknown>[]
    modelValue: unknown | null
    multiple?: boolean
    size?: UiSize
    radius?: UiBorderRadius
  }>(),
  { multiple: false, size: 'default', radius: 'default' },
)
const emit = defineEmits<{
  (e: 'selectedValue', value: unknown): void
}>()

// vars
const open = ref(false)
const dropdown = ref<HTMLElement | null>(null)
const selectedValues = ref<unknown[]>([])

defineModel<unknown | null>('modelValue')

//*** computed
// для отображаение выбранного option
const selectedItem = computed<Dropdown<unknown>[] | Dropdown<unknown> | null>(() => {
  if (props.multiple) {
    return props.items.filter((i) => selectedValues.value.includes(i.value))
  } else {
    return props.items.find((i) => i.value === props.modelValue) || null
  }
})
//  для читаемости если масив отбразить
const selectedLabel = computed(() => {
  if (Array.isArray(selectedItem.value)) {
    if (selectedItem.value.length === 0) return 'Выберите'
    if (selectedItem.value.length === 1) return selectedItem.value[0]?.label
    return `${selectedItem.value[0]?.label} + ${selectedItem.value.length - 1}`
  }
  return selectedItem.value?.label || 'Выберите'
})

//для выборки при (с cntrl/cmnd + click || click)
function select(value: unknown, event?: MouseEvent) {
  if (props.multiple) {
    const isCtrlPressed = event?.metaKey || event?.ctrlKey
    if (isCtrlPressed) {
      if (selectedValues.value.includes(value)) {
        selectedValues.value = selectedValues.value.filter((v) => v !== value)
      } else {
        selectedValues.value.push(value)
      }
    } else {
      selectedValues.value = [value]
      open.value = false
    }
  } else {
    emit('selectedValue', value)
    open.value = false
  }
}

// для стилизаций
function isSelected(value: unknown) {
  if (props.multiple) {
    return selectedValues.value.includes(value)
  } else {
    return props.modelValue === value
  }
}

function handleClickOutside(event?: MouseEvent) {
  if (dropdown.value && !dropdown.value.contains(event?.target as Node)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

function choose() {
  open.value = true
}
</script>

<style scoped lang="scss">
.ui-dropdown__item--selected {
  color: var(--admin-color-helper);
}

.ui-dropdown {
  &__header {
    border: 1px solid var(--fg);
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 0.4rem;
    position: relative;
  }
  &__list {
    padding: 1rem;
    background-color: var(--admin-bg-cart);
    color: var(--fg);
    width: 100%;
    z-index: 2;
  }
  &__item {
    margin-top: 0.4rem;
    white-space: nowrap;
  }
}

@container admin-content (max-width:900px) {
  .ui-dropdown {
    display: flex;
    flex-direction: column;

    &__header {
      flex: 1;
    }
  }
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-45px);
  max-height: 0;
  overflow: hidden;
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: max-content; // достаточно большое значение
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 400ms ease;
}
</style>
