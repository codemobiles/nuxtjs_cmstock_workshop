# Nuxt 3 CMS Stock Course EP.73 - Workshop - Frontend - Layout (Footer)

## Outcome

-   [x] Create `Layout` for Dashboard
-   [x] Create `Footer` component

## Documentation for this episode

-   X

## Setup

1. Move old `default.vue` layout to `~/layouts/demo/default.vue`

```vue
<!-- ~/layouts/demo/default.vue -->

<template>
    <div>
        <a-config-provider
            :theme="{
                token: {
                    colorPrimary: '#00b96b',
                    colorPrimary2: '#00a',
                },
            }"
        >
            <slot></slot>
        </a-config-provider>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
```

2. Create `default.vue` layout in `~/layouts/default.vue`

```vue
<!-- ~/layouts/default.vue -->

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
```

3. Create `Footer.vue` in `~/components/layouts/core/Footer.vue`

```vue
<!-- ~/components/layouts/core/Footer.vue -->

<template>
    <a-layout-footer class="tw-text-center tw-pb-0 tw-pt-4">
        <a-card class="tw-w-full tw-rounded-lg tw-drop-shadow-md">
            CodeMobile - Nuxt 3 2023
        </a-card>
    </a-layout-footer>
</template>
```
