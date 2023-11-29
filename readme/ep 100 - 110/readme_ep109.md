# Nuxt 3 CMS Stock Course EP.109 - Workshop - Frontend - Report - Pie with data from backend

## Outcome

-   [x] Fetch data from backend in `report.vue` page

## Documentation for this episode

-   X

## Setup

1. Create `chart.type.ts` in `~/types/chart.type.ts` folder

```ts
// ~/types/chart.type.ts

export type ChartDataProp = {
    labels: string[];
    data: number[];
    backgroundColor: string[];
};

export type ChartOptionsProp = {
    responsive: boolean;
    plugins: {
        legend: {
            position: string;
            display: boolean;
        };
        title: {
            display: boolean;
            text: string;
        };
    };
};
```

2. Create `PieChart.vue` component, in `~/components/report/PieChart.vue` folder

```vue
<!-- ~/components/report/PieChart.vue -->

<template>
    <a-card class="tw-rounded-md tw-drop-shadow-sm" type="inner">
        <PieChart
            ref="lineRef"
            :chartData="chartData"
            :options="options"
            class="tw-h-[270px]"
        />
    </a-card>
</template>

<script setup lang="ts">
import { PieChart } from "vue-chart-3";

import type { ChartDataProp, ChartOptionsProp } from "~/types/chart.type";

const props = defineProps({
    data: Object as PropType<ChartDataProp>,
    options: Object as PropType<ChartOptionsProp>,
});

const chartData = computed(() => ({
    labels: props.data?.labels,
    datasets: [
        {
            label: "Price",
            data: props.data?.data,
            backgroundColor: props.data?.backgroundColor,
        },
    ],
}));
</script>

<style scoped></style>
```

3. Update `report.vue` by import `ReportPieChart` in `~/pages/report.vue` folder

```vue
<!-- ~/pages/report.vue -->

<template>
    <a-row :gutter="[0, 10]">
        <a-col :span="24">
            <a-card
                class="tw-w-full tw-relative tw-drop-shadow-md hover:tw-drop-shadow-md tw-transition-all tw-rounded-lg"
            >
                <ACardMeta title="Overview"> </ACardMeta>
                <ReportLineChart
                    :data="overViewData.data"
                    :data2="overViewData.data2"
                    :chart-data-bg-color="overViewData.backgroundColor"
                    :labels="overViewData.labels"
                ></ReportLineChart>
                <!-- <a-col :span="24">
                        <a-button type="primary" @click="shuffleData">
                            shuffleData
                        </a-button>
                    </a-col> -->
            </a-card>
        </a-col>
        <a-col :span="16" class="tw-pr-3">
            <a-card
                class="tw-w-full tw-drop-shadow-md hover:tw-drop-shadow-md tw-transition-all tw-rounded-lg"
            >
                <a-row>
                    <a-col :span="24" class="tw-mb-4">
                        <ACardMeta title="Top 5 Most High Stock"> </ACardMeta>
                        <ReportBarChart
                            :data="topFiveMostHighStock"
                        ></ReportBarChart>
                    </a-col>
                </a-row>
            </a-card>
        </a-col>
        <a-col :span="8">
            <a-card
                class="tw-w-full tw-drop-shadow-md hover:tw-drop-shadow-md tw-transition-all tw-rounded-lg"
            >
                <ACardMeta title="Top 5 Most High Price"> </ACardMeta>
                <ReportPieChart :data="topFiveMostHighPrice"></ReportPieChart>
            </a-card>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import type { TProduct } from "~/types/product.type";

definePageMeta({
    title: "Report",
    description: "Report",
    layout: "default",
});

const { data: mostHighStockData, pending: mostHighStockPending } = useFetch<
    TProduct[]
>("/api/v2/report/top-5-most-high-stock");

const { data: mostHighPriceData, pending: mostHighPriceDataPending } = useFetch<
    TProduct[]
>("/api/v2/report/top-5-most-high-price");

//* Overview zone
const overViewData = reactive({
    data: [30, 40, 60, 70, 5, 35, 12, 75, 42, 33, 10, 2],
    data2: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                display: false,
            },
            title: {
                display: false,
                text: "Overview",
            },
        },
    },
    backgroundColor: [
        "#7A306C",
        "#8E8DBE",
        "#A9E4EF",
        "#81F495",
        "#96F550",
        "#EF476F",
        "#FFD166",
        "#06D6A0",
        "#118AB2",
        "#073B4C",
        "#0B132B",
        "#96F550",
    ],
});

const topFiveMostHighStock = computed(() => ({
    data: mostHighStockData.value?.map((item) => item.stock) ?? [],
    labels: mostHighStockData.value?.map((item) => item.name) ?? [],
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                display: false,
            },
            title: {
                display: false,
                text: "Overview",
            },
        },
    },
    backgroundColor: ["#7A306C", "#8E8DBE", "#A9E4EF", "#81F495", "#96F550"],
}));

const topFiveMostHighPrice = computed(() => ({
    data: mostHighPriceData.value?.map((item) => item.price) ?? [],
    labels: mostHighPriceData.value?.map((item) => item.name) ?? [],
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                display: false,
            },
            title: {
                display: false,
                text: "Overview",
            },
        },
    },
    backgroundColor: ["#7A306C", "#8E8DBE", "#A9E4EF", "#81F495", "#96F550"],
}));

const shuffleData = () => {
    // const array = ref([lineData, barData, pieData]);
    // profit.value = +Math.floor(Math.random() * 10000);
    // for (const [index, dataset] of array.value.entries()) {
    //     const tempDataset = dataset.value;
    //     for (let i = tempDataset.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [tempDataset[i], tempDataset[j]] = [tempDataset[j], tempDataset[i]];
    //     }
    //     array.value[index].value = tempDataset;
    // }
};
</script>

<style scoped></style>
```
