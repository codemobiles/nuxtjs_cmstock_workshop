<template>
    <div>
        <h1>Chartjs (BarChart)</h1>
        <BarChart
            v-bind="barChartProps"
            :options="options"
            class="tw-h-full md:tw-max-h-[270px]"
        />
    </div>
</template>

<script setup lang="ts">
import { BarChart, useBarChart } from "vue-chart-3";
const lineData = ref([30, 40, 60, 70, 5, 35, 12, 75, 42, 33, 10, 2]);

const options = ref({
    responsive: true,
    plugins: {
        legend: {
            position: "top",
            display: false,
        },
        title: {
            display: false,
            text: "Monthly",
        },
    },
});

const chartData = computed(() => ({
    labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    datasets: [
        {
            data: lineData.value as any,
            backgroundColor: [
                "#EF476F",
                "#FFD166",
                "#7A306C",
                "#8E8DBE",
                "#A9E4EF",
                "#81F495",
                "#96F550",
            ],
        },
    ],
}));

const { barChartProps, barChartRef } = useBarChart({
    chartData,
});
</script>

<style scoped></style>
