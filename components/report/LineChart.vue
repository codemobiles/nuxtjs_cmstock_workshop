<template>
    <a-card class="tw-rounded-md tw-drop-shadow-sm" type="inner">
        <LineChart
            ref="lineRef"
            :chartData="chartData"
            :options="options"
            class="tw-h-[270px]"
        />
    </a-card>
</template>

<script setup lang="ts">
import { LineChart } from "vue-chart-3";

const props = defineProps({
    data: Array,
    labels: Array,
    options: Object,
    chartDataBgColor: Array,
});

const lineRef = ref();

const chartData = computed(() => ({
    labels: props.labels,
    datasets: [
        {
            label: "My Overview",
            data: props.data as any,
            backgroundColor: props.chartDataBgColor,
        },
    ],
}));
</script>

<style scoped></style>
