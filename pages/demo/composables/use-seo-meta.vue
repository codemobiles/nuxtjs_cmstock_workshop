<template>
    <div>Test SEO</div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: "My Amazing Site",
    ogTitle: "My Amazing Site",
    description: "This is my amazing site, let me tell you all about it.",
    ogDescription: "This is my amazing site, let me tell you all about it.",
    ogImage: "https://example.com/image.png",
    twitterTitle: "My Amazing Site",
    twitterDescription:
        "This is my amazing site, let me tell you all about it.",
    twitterImage: "https://example.com/image.png",
    twitterCard: "summary_large_image",
});
</script>

<style scoped></style>
