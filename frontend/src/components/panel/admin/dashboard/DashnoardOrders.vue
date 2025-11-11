<template>
  <div class="orders-chart-1 admin-card w-full h-full !flex-1/2">
    <!-- <apex-charts ref="chart" v-bind="chartData"></apex-charts> -->
    <div class="p-5 flex justify-between">
      <h2 class="admin-title">Колличество Заказов</h2>
      <div>Тут фильтр будет</div>
    </div>
    <div class="chart-wrapper mx-auto">
      <apex-charts
        class="max-w-xl w-full"
        ref="chart"
        :options="chartData.options"
        :series="chartData.options.series"
      ></apex-charts>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type ApexOptions } from 'apexcharts'

const chartData = ref<{
  options: ApexOptions
}>({
  options: {
    chart: {
      id: 'sales-line',
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
        borderRadius: 10,
      },
    },
    xaxis: { categories: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] },
    stroke: { curve: 'smooth' },
    tooltip: { enabled: true, cssClass: 'chart-order-1' },
    colors: ['var(--dashboard-chart-color-1)', 'green', '#9C27B0'],
    series: [{ name: 'Заказов', data: [13, 124, 22, 25, 40, 30, 100] }],
  },
})
</script>

<style scoped lang="scss">
::v-deep(.chart-order-1) {
  /* .chart-1-tooltip { */
  color: black !important;
  background: var(--fg) !important;

  > .apexcharts-tooltip-title {
    background-color: var(--fg);
  }
  .apexcharts-menu {
    color: black !important;
  }
  /* } */
}
::v-deep(.apexcharts-menu) {
  color: black;
}
.chart-wrapper {
  max-width: 31.25rem;
}
</style>
