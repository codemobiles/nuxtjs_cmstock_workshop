# Nuxt 3 CMS Stock Course EP.111 - Workshop - Frontend - Module VueUse

## Outcome

-   [x] Add `vueuse` module to `nuxt.config.ts` file
-   [x] `VueUse` documentation: <https://vueuse.org/>

## Documentation for this episode

-   [VueUse](https://vueuse.org/)

## Setup

1. Install `vueuse` module

```bash
yarn add @vueuse/core
```

2. Update `nuxt.config.ts` file

```ts
// nuxt.config.ts

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ..
    modules: [
        ..
        ..
        "@vueuse/nuxt",
        ..
        ..
    ],
    ..
});
```
