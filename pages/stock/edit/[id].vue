<template>
    <div>
        {{ route.params.id }}
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "default",
});
const route = useRoute();
</script>

<style scoped></style>
