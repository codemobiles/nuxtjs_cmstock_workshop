<template>
    <a-layout class="tw-min-h-screen" hasSider>
        <!-- <ClientOnly>
            <LayoutsCoreSidebar
                v-model:collapsed="collapsed"
            ></LayoutsCoreSidebar>
        </ClientOnly> -->
        <a-layout class="tw-w-full tw-overflow-auto">
            <!-- <LayoutsCoreHeader></LayoutsCoreHeader> -->
            <a-layout-content class="tw-p-5">
                <slot />
            </a-layout-content>
            <LayoutsCoreFooter></LayoutsCoreFooter>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts"></script>

<style scoped></style>
