<template>
    <div>
        {{ counter.count }}
        <h2>Double Count</h2>
        {{ counter.doubleCount }}
        <h2>Display Count</h2>
        {{ counter.displayCounterText }}
    </div>
</template>

<script setup lang="ts">
const counter = useCounterStore();
</script>

<style scoped></style>
