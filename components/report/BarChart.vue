<template>
    <a-card class="tw-rounded-md tw-drop-shadow-sm" type="inner">
        <BarChart
            ref="lineRef"
            :chartData="chartData"
            :options="options"
            class="tw-h-[270px]"
        />
    </a-card>
</template>

<script setup lang="ts">
import { BarChart } from "vue-chart-3";
import type { ChartDataProp, ChartOptionsProp } from "~/types/chart.type";

const props = defineProps({
    data: Object as PropType<ChartDataProp>,
    options: Object as PropType<ChartOptionsProp>,
});

const chartData = computed(() => ({
    labels: props.data?.labels,
    datasets: [
        {
            label: "Top 5 Most High Stock",
            data: props.data?.data,
            backgroundColor: props.data?.backgroundColor,
        },
    ],
}));
</script>

<style scoped></style>
