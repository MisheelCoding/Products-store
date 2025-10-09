<template>
  <div>
    <h2>admin dashboard</h2>
    <main class="_container mt-10">
      <div class="flex gap-4">
        <SharedCounterCard
          title="Конверсии"
          :count="'7.8'"
          subtitle="Средний показатель за неделю (%)"
        ></SharedCounterCard>
        <SharedCounterCard
          :title="'Продукты в каталоге'"
          :count="156"
          :count-plus="true"
          subtitle="Активных позиций на сайте"
        ></SharedCounterCard>
        <SharedCounterCard
          :title="'Доход'"
          :count="48250"
          subtitle="за текущий месяц"
        ></SharedCounterCard>
        <SharedCounterCard
          :title="'Заказы'"
          :count="1400"
          subtitle="За последние 7 дней"
        ></SharedCounterCard>
      </div>
      <div class="flex items-center gap-5 max-h-[25rem]">
        <DashnoardOrders></DashnoardOrders>
        <DashboardCategories />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import DashboardCategories from '@/components/panel/admin/dashboard/DashboardCategories.vue'
import DashnoardOrders from '@/components/panel/admin/dashboard/DashnoardOrders.vue'
import SharedCounterCard from '@/components/shared/SharedCounterCard.vue'
</script>

<style scoped lang="scss">
._container {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  width: 100%;
  height: 85svh;
  overflow-y: scroll !important;
  /* container-type: inline-size;
  container-name: admin-view; */
  container: admin-view / inline-size;
}

@container admin-view (max-width: 1920px) {
  article {
    min-width: calc((100% - 2 * 0.875rem) / 3);
  }
}
@container admin-view (max-width: 670px) {
  article {
    flex-direction: row;
    min-width: 100%;
  }
}
</style>
