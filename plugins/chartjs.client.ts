import { defineNuxtPlugin } from "#app";
import { Chart, registerables } from "chart.js";
import VueChart3 from "vue-chart-3";
Chart.register(...registerables);

export default defineNuxtPlugin((nuxtApp) => {
    //   nuxtApp.vueApp.component("VueChart3", VueChart3);
    nuxtApp.vueApp.config.globalProperties.$Chart = Chart;
});
