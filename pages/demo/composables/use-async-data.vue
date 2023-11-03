<template>
    <div>
        {{ data }}
    </div>
</template>

<script setup lang="ts">
const { data, pending, error, refresh } = await useAsyncData("mountains", () =>
    $fetch("https://api.nuxtjs.dev/mountains")
);

const { pending: pendingLazy, data: count } = await useLazyAsyncData(
    "count",
    () => $fetch("/api/count")
);

watch(count, (newCount) => {
    console.log("newCount", newCount);
    // Because count might start out null, you won't have access
    // to its contents immediately, but you can watch it.
});
</script>

<style scoped></style>
