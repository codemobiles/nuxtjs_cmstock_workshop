# Nuxt 3 CMS Stock Course EP.78 - Workshop - Fix bug Ant design

## Outcome

-   [x] Fix UI delay on `server side rendering` by using `<ClientOnly>` component

## Documentation for this episode

-   X

## Setup

1. Add `<ClientOnly>` inside `app.vue`

```vue
<template>
    <ClientOnly>
        <NuxtLayout>
            <!-- <h1 class="mydivclass"
                style="color: green;"
                >{{ msg }}</h1>
                <input type="text" placeholder="Search">
                <h3>Image From public/</h3>
                <img src="./images/dog.jpeg" alt="Dog logo">
                <h3>Image From assets/</h3>
                <img src="~/assets/images/mountain.jpg" alt="Dog logo"> -->
            <NuxtPage> </NuxtPage>
        </NuxtLayout>
    </ClientOnly>
</template>

<script setup lang="ts">
const msg = "My CMS Stock application";
</script>

<style scoped>
.mydivclass {
    color: orange;
}
</style>
```

2. Change `layout: "authen"` to `layout: "default"` in `~/pages/index.vue`

```vue
<!-- ~/pages/index.vue -->

<template>
    <div></div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "default",
});
</script>

<style scoped></style>
```
