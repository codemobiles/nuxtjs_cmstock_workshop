# Nuxt 3 CMS Stock Course EP.75 - Workshop - Frontend - Layout (Header)

## Outcome

-   [x] Create `Layout` for Dashboard
-   [x] Create `Header` component

## Documentation for this episode

-   X

## Setup

1. Create `Header.vue` in `~/components/layouts/core/Header.vue`

```vue
<template>
    <a-layout-header class="tw-p-0 !tw-bg-[#00B98Dff] tw-drop-shadow-md">
        <a-row
            align="start"
            justify="space-between"
            class="tw-items-center tw-h-full tw-px-4"
        >
            <a-tag ghost class="tw-rounded-lg tw-p-2">
                <span class="tw-font-bold tw-text-xl">
                    <a-row align="center" justify="space-between">
                        <AreaChartOutlined
                            class="tw-text-lg tw-pr-2 tw-text-white"
                        />
                        <span class="tw-text-white">
                            CMDev - Stock Workshop
                        </span>
                    </a-row>
                </span>
            </a-tag>
            <a-tag
                color="#EE2E31"
                class="tw-rounded-lg tw-px-4 tw-cursor-pointer"
            >
                <a-row justify="center" class="!tw-items-center tw-pt-1">
                    <LogoutOutlined class="tw-text-lg" />
                    <!-- <span class="tw-font-bold tw-text-xl"> Logout </span> -->
                </a-row>
            </a-tag>
        </a-row>
    </a-layout-header>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
</script>

<style scoped></style>
```

2. Update `default.vue` layout in `~/layouts/default.vue`

```vue
<!-- ~/layouts/default.vue -->

<template>
    <a-layout class="tw-min-h-screen" hasSider>
        <LayoutsCoreHeader v-model:collapsed="collapsed"></LayoutsCoreHeader>
        <a-layout class="tw-w-full tw-overflow-auto">
            <LayoutsCoreHeader></LayoutsCoreHeader>
            <a-layout-content class="tw-p-5">
                <slot />
            </a-layout-content>
            <LayoutsCoreFooter></LayoutsCoreFooter>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts"></script>

<style scoped></style>
```
