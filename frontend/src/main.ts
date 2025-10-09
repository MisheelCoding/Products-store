import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VueApexCharts from 'vue3-apexcharts'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
// app.use(VueApexCharts)

app.component('ApexCharts', VueApexCharts)

app.mount('#app')

const auth = useAuthStore(pinia)

auth.tryRestore()
