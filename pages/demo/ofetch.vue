<template>
    <div>
        <h1 v-if="pending">Loading....</h1>
        <h1 else>Fetch success</h1>
    </div>
</template>

<script setup lang="ts">
const {
    data: gitHubProfile,
    pending,
    error,
} = await useFetch(`https://api.github.com/users/alonespace`, {});
</script>

<style scoped></style>
