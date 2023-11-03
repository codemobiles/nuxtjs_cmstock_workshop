<template>
    <div>
        {{ config.public.publicEnv }}
    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
await useFetch("/api/secret-env");
</script>

<style scoped></style>
