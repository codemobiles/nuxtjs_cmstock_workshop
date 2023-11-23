<template>
    <div>
        <p>{{ productStore.products }}</p>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "default",
});

const productStore = useProductStore();

productStore.loadProducts();
</script>

<style scoped></style>
