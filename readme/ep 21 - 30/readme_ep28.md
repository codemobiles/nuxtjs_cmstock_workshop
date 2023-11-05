# Nuxt 3 CMS Stock Course EP.28 - NuxtImg

## Outcome

-   Understand how to use `<NuxtImg>` tag
-   Understand how to use `<NuxtImg>` tag with `prefetch` property
-   Understand how to use `<NuxtImg>` tag with `placeholder` property

## Documentation for this episode

https://nuxt.com/docs/api/components/nuxt-img

## Setup

1. Create `nuxt-img.vue` folder inside `~/pages/demo/components` folder and add code below

```vue
<template>
    <div>
        <NuxtImg src="/images/dog.jpeg" width="200" height="300" />
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
```

2. Go visit `http://localhost:3000/demo/components/nuxt-img` and see the result
