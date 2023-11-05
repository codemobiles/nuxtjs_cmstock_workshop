# Nuxt 3 CMS Stock Course EP.27 - NuxtLink

## Outcome

-   Understand how to use `<NuxtLink>` tag
-   Understand how to use `<NuxtLink>` tag with `prefetch` property

## Documentation for this episode

https://nuxt.com/docs/api/components/nuxt-link

## Setup

1. Create `nuxt-link.vue` folder inside `~/pages/demo/components` folder and add code below

```vue
<template>
    <div>
        <NuxtLink to="/demo/ofetch" target="_top"> Ofetch (_self) </NuxtLink>
        <NuxtLink to="/demo/about" target="_blank"> About </NuxtLink>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
```

2. Go visit `http://localhost:3000/demo/components` and see the result
