<template>
    <div>
        {{ response.data }}
        {{ responsePingPong.data }}
    </div>
</template>

<script setup lang="ts">
const response = await useFetch("/api/hello", {
    method: "POST",
});
const responsePingPong = await useFetch("/ping", {
    method: "POST",
});
</script>

<style scoped></style>
