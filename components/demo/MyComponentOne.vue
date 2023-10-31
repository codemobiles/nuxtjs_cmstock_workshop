<template>
    <div>
        <h1>Components</h1>
        <p>{{ firstLine }}</p>
        <p>{{ secondLine }}</p>
        <p>{{ balance }}</p>
    </div>
</template>

<script setup lang="ts">
//* Author, Date: 9/9/2021
const props = defineProps({
    firstLine: {
        type: String,
        required: true,
        default: "This is my First line of Component",
    },
    secondLine: {
        type: String,
        required: false,
        default: "This is my Second line of Component",
    },
    balance: {
        type: Number,
        required: false,
        default: 0,
    },
});
</script>

<style scoped></style>
