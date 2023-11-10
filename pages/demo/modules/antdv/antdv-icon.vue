<template>
    <div>
        <StepBackwardFilled />
        <DownCircleFilled />
        <DownCircleTwoTone />
        <a-space warp>
            <a-tooltip title="search">
                <a-button
                    type="primary"
                    shape="circle"
                    :icon="h(SearchOutlined)"
                />
            </a-tooltip>
            <a-button type="primary" shape="circle">A</a-button>
            <a-button type="primary" :icon="h(SearchOutlined)">Search</a-button>
            <a-tooltip title="search">
                <a-button shape="circle" :icon="h(SearchOutlined)" />
            </a-tooltip>
            <a-button :icon="h(SearchOutlined)">Search</a-button>
        </a-space>
    </div>
</template>

<script setup lang="ts">
import { SearchOutlined } from "@ant-design/icons-vue";
</script>

<style scoped></style>
