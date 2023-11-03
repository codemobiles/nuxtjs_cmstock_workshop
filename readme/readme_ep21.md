# Nuxt 3 CMS Stock Course EP.21 - useHead

## Outcome

-   Learn how to use `useHead` composable
-   Learn how to set `title`, `meta` and `link` tags

## Documentation for this episode

https://nuxt.com/docs/api/composables/use-head

## Setup

1. Create `use-head.vue` folder inside `~/pages/demo/composables` folder and add code below

```vue
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
```

## Result

When we visit `http://localhost:3000/demo/composables/use-head` we should see following result

![Result](./images/ep21/result1.png)
