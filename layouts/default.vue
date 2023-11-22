<template>
    <a-layout class="tw-min-h-screen" hasSider>
        <LayoutsCoreSidebar :collapsed="collapsed"></LayoutsCoreSidebar>
        <a-layout class="tw-w-fsull tw-overflow-auto">
            <LayoutsCoreHeader></LayoutsCoreHeader>
            <a-layout-content class="tw-p-5">
                <slot />
            </a-layout-content>
            <LayoutsCoreFooter></LayoutsCoreFooter>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
const collapsed = ref<boolean>(false);
</script>

<style scoped></style>
