<template>
    <div>
        <h1>Counter: {{ counterCookie || "-" }}</h1>
        <button @click="counterCookie = -1">reset</button>
        <button @click="counterCookie--">-</button>
        <button @click="counterCookie++">+</button>
    </div>
</template>

<script setup lang="ts">
const counterCookie = useCookie<number>("counter", {});
</script>

<style scoped></style>
