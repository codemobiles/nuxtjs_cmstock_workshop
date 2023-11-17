<template>
    <div>
        <h3>{{ product.name }}</h3>
        <img :src="getFullImage(product.image)" :alt="product.name" />
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const product = await $fetch(`/api/v2/products/${route.params.id}`);

const getFullImage = (image: string) => {
    return `/uploaded/images/${image}`;
};
</script>

<style scoped></style>
