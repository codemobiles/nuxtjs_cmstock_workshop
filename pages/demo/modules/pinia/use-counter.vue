<template>
    <div>
        {{ counter.count }}
    </div>
</template>

<script setup lang="ts">
const counter = useCounterStore();
</script>

<style scoped></style>
