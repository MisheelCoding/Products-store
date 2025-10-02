<template>
  <aside
    ref="panel"
    class="panel-sidebar bg-[var(--admin-bg-cart)] !text-[var(--admin-color)] py-4 px-2 !relative overflow-x-hidden w-full min-w-0 flex flex-col"
  >
    <UiLink to="/admin" class="text-[1rem] mb-5 whitespace-nowrap flex items-center gap-2">
      <ui-logo class="shrink-0" />
      <span v-show="!collapse"> Misheel panel</span>
    </UiLink>
    <button type="button" @click="handleCollapse" class="self-end">
      <Icon
        :icon="collapse ? 'f7:chevron-right-2' : 'f7:chevron-left-2'"
        width="25px"
        height="25px"
        style="color: #fff"
      />
    </button>
    <nav class="panel-sidebar__nav mt-10">
      <h2
        class="text-[.5rem] whitespace-nowrap mb-5 min-h-[.75rem]"
        :class="collapse ? 'opacity-0' : ''"
      >
        меню
      </h2>
      <ul class="panel-sidebar__list flex flex-col gap-5">
        <li class="panel-sidebar__item" v-for="(link, i) in links" :key="i">
          <ui-link
            :to="link.link"
            class="flex items-center gap-2 active transition"
            :class="collapseEnd ? 'w-max' : ''"
          >
            <Icon
              :icon="link.icon"
              width="1.5rem"
              height="1.5rem"
              class="shrink-0 transition duration-400 ease"
              :class="collapseEnd ? 'mx-auto ' : ''"
            />
            <span v-show="!collapseEnd" class="whitespace-nowrap overflow-hidden">
              {{ ADMIN_PAGE_TITLES[link.title] }}
            </span>
          </ui-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import UiLink from '@/components/ui/UiLink.vue'
import UiLogo from '@/components/ui/UiLogo.vue'
import { ADMIN_PAGE_TITLES, type PanelLink } from '@/types/penel'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const collapse = ref(false)
const panel = ref<HTMLElement | null>(null)
const collapseEnd = ref(false)

function handleCollapse() {
  panel.value?.classList.toggle('is-collapsed')

  if (!collapse.value) {
    setTimeout(() => (collapseEnd.value = true), 300)
  } else {
    collapseEnd.value = false
  }
  collapse.value = !collapse.value
}

const props = defineProps<{
  links: PanelLink[]
}>()
</script>

<style scoped>
.panel-sidebar {
  flex: 0 0 22.5%;
  transition: flex 400ms ease;
}
.panel-sidebar.is-collapsed {
  flex: 0 0 62px;
}
</style>
