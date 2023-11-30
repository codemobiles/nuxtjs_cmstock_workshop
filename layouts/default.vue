<template>
    <a-layout class="tw-min-h-screen" hasSider>
        <LayoutsCoreSidebar :collapsed="collapsed"></LayoutsCoreSidebar>
        <a-layout class="tw-w-fsull tw-overflow-auto">
            <LayoutsCoreHeader></LayoutsCoreHeader>
            <a-layout-content class="tw-p-5">
                <div v-if="$route.path.startsWith('/demo')">
                    <h1>
                        <nuxt-link to="/demo">Back to Home</nuxt-link>
                        <hr />
                    </h1>
                </div>
                <div v-if="$route.path.startsWith('/demo/products/')">
                    <h1>
                        <nuxt-link to="/demo/products"
                            >Back to Products Page</nuxt-link
                        >
                        <hr />
                    </h1>
                </div>
                <slot />
            </a-layout-content>
            <LayoutsCoreFooter></LayoutsCoreFooter>
        </a-layout>
    </a-layout>
</template>

<script setup lang="ts">
const collapsed = ref<boolean>(false);
const route = useRoute();
</script>

<style scoped></style>
