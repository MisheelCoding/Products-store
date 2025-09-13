<template>
  <header class="header flex justify-between container py-5">
    <!-- logo -->

    <div>
      <div class="header__burger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <RouterLink class="header__logo" to="/">Logo</RouterLink>
    </div>

    <!-- header navigation -->
    <!-- <nav class="header__nav flex gap-5">
      <ul class="header__list flex gap-3">
        <li class="header__item" v-for="(el, i) in 4" :key="i">
          <router-link to="" class="header__link">routes</router-link>
        </li>
      </ul>

    </nav> -->

    <div class="header__actions flex gap-1">
      <router-link :to="{ name: 'favorites' }" class="header__favorite">
        <Icon
          icon="material-symbols-light:favorite-outline"
          width="30px"
          height="30px"
          style="color: #000"
        />
      </router-link>
      <router-link :to="{ name: 'cart' }" class="header__cart">
        <Icon icon="solar:cart-3-broken" width="30px" height="30px" style="color: #000" />
      </router-link>
      <router-link to="/profile" class="header__profile">
        <Icon icon="healthicons:ui-user-profile" width="30px" height="30px" style="color: #000" />
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
</script>

<style scoped lang="scss"></style>
