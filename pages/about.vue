<template>
    <a-row>
        <a-col :span="24">
            <a-card>
                <span class="tw-text-gray-800 tw-font-bold tw-pr-2">{{
                    pageViewResponse.pageview
                }}</span>
                <span class="tw-pr-2">Page views since</span>
                <span class="tw-text-gray-400">{{ time }}</span>
            </a-card>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "default",
});
const { data } = await useFetch("/api/v2/pageview");
const pageViewResponse = data.value as { startAt: string; pageview: number };
const time = useTimeAgo(pageViewResponse.startAt);
</script>

<style scoped></style>
