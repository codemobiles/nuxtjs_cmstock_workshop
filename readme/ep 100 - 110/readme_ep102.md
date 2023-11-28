# Nuxt 3 CMS Stock Course EP.102 - Workshop - Frontend - Report - Create UI

## Outcome

-   [x] Create UI in Report

## Documentation for this episode

-   X

## Setup

1. Create `report.vue` in `pages/report.vue`

```vue
<template>
    <a-row :gutter="[0, 10]">
        <a-col :span="24">
            <a-card
                class="tw-w-full tw-relative tw-drop-shadow-md hover:tw-drop-shadow-md tw-transition-all tw-rounded-lg"
            >
                <ACardMeta title="Overview"> </ACardMeta>
                <!-- <ReportLineChart :data="lineData"></ReportLineChart> -->
            </a-card>
        </a-col>
        <a-col :span="16" class="tw-pr-3">
            <a-card
                class="tw-w-full tw-drop-shadow-md hover:tw-drop-shadow-md tw-transition-all tw-rounded-lg"
            >
                <a-row>
                    <a-col :span="24" class="tw-mb-4">
                        <ACardMeta title="Profit"> </ACardMeta>
                        <!-- <ReportBarChart :data="lineData" :profit="profit"></ReportBarChart> -->
                    </a-col>
                    <a-col :span="24">
                        <a-button type="primary" @click="shuffleData">
                            shuffleData
                        </a-button>
                    </a-col>
                </a-row>
            </a-card>
        </a-col>
        <a-col :span="8">
            <a-card
                class="tw-w-full tw-drop-shadow-md hover:tw-drop-shadow-md tw-transition-all tw-rounded-lg"
            >
                <ACardMeta title="Top 5 Most high price"> </ACardMeta>

                <!-- <ReportPieChart :data="lineData"></ReportPieChart> -->
            </a-card>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
definePageMeta({
    title: "Report",
    description: "Report",
    layout: "default",
});
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
