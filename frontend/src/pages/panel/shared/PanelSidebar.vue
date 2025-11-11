<template>
  <aside
    ref="panel"
    class="panel-sidebar bg-[var(--admin-bg-cart)] !text-[var(--admin-color)] py-4 px-2 relative overflow-x-hidden flex flex-col"
    :class="{ 'mobile-nav': isMobile }"
  >
    <UiLink
      to="/admin"
      class="text-[1rem] mb-5 whitespace-nowrap flex items-center gap-2"
      v-if="!isMobile"
    >
      <ui-logo class="shrink-0" />
      <span v-show="!collapse"> Misheel panel</span>
    </UiLink>

    <!-- кнопка только на десктопе -->
    <button type="button" @click="handleCollapse" class="self-end collapse-btn" v-if="!isMobile">
      <Icon
        :icon="collapse ? 'f7:chevron-right-2' : 'f7:chevron-left-2'"
        width="25px"
        height="25px"
        style="color: #fff"
      />
    </button>

    <nav class="panel-sidebar__nav mt-10" :class="{ 'mt-0': isMobile }">
      <ul
        class="panel-sidebar__list flex flex-col gap-5"
        :class="{ 'flex-row justify-around': isMobile }"
      >
        <li class="panel-sidebar__item" v-for="(link, i) in links" :key="i">
          <ui-link
            :to="link.link"
            class="flex items-center gap-2 transition first:active"
            :class="[isMobile ? 'flex-col' : '', route.path === link.link ? 'active' : '']"
          >
            <Icon :icon="link.icon" width="1.5rem" height="1.5rem" />
            <span v-show="!collapseEnd && !isMobile">{{ ADMIN_PAGE_TITLES[link.title] }}</span>
          </ui-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script setup lang="ts">
import UiLink from '@/components/ui/UiLink.vue'
import UiLogo from '@/components/ui/UiLogo.vue'
import { useIsMobile } from '@/composables/shared/useMobile'
import { ADMIN_PAGE_TITLES, type PanelLink } from '@/types/penel'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const collapse = ref(false)
const panel = ref<HTMLElement | null>(null)
const collapseEnd = ref(false)
const { isMobile } = useIsMobile()

const route = useRoute()

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
  max-width: 22.5% !important;
  flex: 0 0 22.5%;
  transition: flex 400ms ease;
}
.panel-sidebar.is-collapsed {
  flex: 0 0 62px;
}

@media (max-width: 768px) {
  .panel-sidebar.mobile-nav {
    position: fixed !important;
    left: 0;
    bottom: 0;
    right: 0;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    max-width: 100% !important;

    height: 60px;
    padding: 0.5rem;
    z-index: 1000;

    > nav {
      margin: 0;
      ul > li {
        width: 5rem;
      }
    }
  }
  .panel-sidebar__nav {
    width: 100%;
  }
  .panel-sidebar__list {
    width: 100%;
  }
}
</style>
