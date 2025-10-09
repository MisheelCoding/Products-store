<template>
  <div class="chart-products-1 admin-card h-full w-full !flex-1/2">
    <div class="flex justify-between items-center p-5">
      <h2 class="admin-title">Самые популярные категории товаров</h2>
      <div>тут будет фильтр</div>
    </div>
    <div class="chart-wrapper mx-auto">
      <apex-charts :options="chartData.options" :series="chartData.options.series"> </apex-charts>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ApexOptions } from 'apexcharts'
import { ref } from 'vue'
const chartColors = [
  'var(--dashboard-chart-color-1)',
  '#87dc3e',
  '#fed846',
  '#7947ee',
  '#b196f5',
  '#ab523f',
]
const chartData = ref<{ options: ApexOptions }>({
  options: {
    series: [14, 22, 35, 19, 8, 27],
    chart: {
      type: 'donut',
      height: 300,
      width: 300,
    },
    tooltip: {},
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          background: 'transparent',
        },
        customScale: 0.7,
        offsetY: -45,
      },
      line: {},
    },

    stroke: {
      show: false,
    },

    colors: chartColors,
    labels: ['Сыр', 'Молочные', 'Фрукты', 'Колбасы', 'Сладости', 'Овощи'],
    legend: {
      position: 'right',
    },
  },
})
</script>

<style scoped>
.chart-wrapper {
  max-width: 31.25rem;
}
</style>
