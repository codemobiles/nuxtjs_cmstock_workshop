<template>
    <div>
        <h1>Product Page</h1>
        <h2>Product ID: {{ route.params.id }}</h2>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped></style>
