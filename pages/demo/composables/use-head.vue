<template>
    <div>Test</div>
</template>

<script setup lang="ts">
useHead({
    title: "Hello Use Head",
    meta: [
        {
            name: "description",
            content: "Hello Use Head",
        },
        {
            name: "og:description",
            content: "Hello Use Head",
        },
        {
            name: "og:title",
            content: "Hello Use Head",
        },
    ],
    link: [
        {
            rel: "canonical",
            href: "https://example.com",
        },
        {
            rel: "icon",
            href: "https://example.com/favicon.ico",
        },
    ],
    script: [
        {
            src: "https://example.com/script.js",
            async: true,
        },
    ],
});
</script>

<style scoped></style>
