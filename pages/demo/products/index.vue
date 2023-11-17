<template>
    <div>
        <h1>Products</h1>
        <div>
            <ul>
                <li v-for="product in products" :key="product.id">
                    <nuxt-link :to="`/demo/products/${product.id}`">
                        {{ product.name }}
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
const products = await $fetch(`/api/v2/products`);
</script>

<style scoped></style>
