# Nuxt 3 CMS Stock Course EP.25 - useAsyncData and useLazyAsyncData

## Outcome

-   Learn what is `useAsyncData` composable
-   Learn how to use `useAsyncData` composable
-   Learn how to use `useAsyncData` composable in `client` and `server`
-   Learn what is difference between `useFetch` and `useAsyncData`

## Documentation for this episode

https://nuxt.com/docs/api/composables/use-async-data
https://nuxt.com/docs/api/composables/use-lazy-async-data

## Setup

1. Create `use-async-data.vue` folder inside `~/pages/demo/composables` folder and add code below

```vue
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
```

2. Go visit `http://localhost:3000/demo/composables/use-async-data` and we should see following result

## Result

When we visit `http://localhost:3000/demo/composables/use-async-data` we should see following result

![Result](../images/ep25/result1.png)
