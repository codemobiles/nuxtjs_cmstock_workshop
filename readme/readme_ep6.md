# Nuxt 3 CMS Stock Course EP.3

## Outcome

-   Understand basic routing in nuxt
-   Understand how to use `<nuxt-link>` tag

## Documentation for Router

https://nuxt.com/docs/guide/assets

## Setup

1. Create `pages` folder in root directory

```
(project)/
| --- pages/
```

2. Create `index.vue` and `about.vue` in `pages/demo` folder

```
(project)/
| --- pages/
|      | --- demo/
|      |      | --- index.vue
|      |      | --- about.vue

```

3. Change `app.vue` following code below

```html
<template>
    <div>
        <NuxtPage> </NuxtPage>
    </div>
</template>
```

4. Add `<nuxt-link>` tag in `index.vue` and `about.vue`

```html
<!-- pages/demo/index.vue -->
<template>
    <div>
        <h1>Home</h1>
        <p>
            <nuxt-link to="/demo/about">About</nuxt-link>
        </p>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
```

```html
<!-- pages/demo/about.vue -->
<template>
    <div>
        <h1>About</h1>
        <p>
            <nuxt-link to="/demo">Home</nuxt-link>
        </p>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
```
