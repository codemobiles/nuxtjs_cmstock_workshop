# Nuxt 3 CMS Stock Course EP.34 - Module Pinia

## Outcome

-   Understand how to install `Pinia` in Nuxt 3 (Module)
-   Understand how to use `Pinia` in Nuxt 3

## Documentation for this episode

https://nuxt.com/modules/pinia

## Setup

1. Add `@pinia/nuxt` dependency to your project

```bash
# Using pnpm
npm i @pinia/nuxt
```

2. Add `@pinia/nuxt` to the `modules` section of `nuxt.config.ts`

```ts
// nuxt.config.ts

export default defineNuxtConfig({
    modules: ["@pinia/nuxt"],
    pinia: {
        storesDirs: ["./stores/**"], // enable store auto import
    },
});
```

3. Create `~/stores/index.ts` file

```ts
// ~/stores/index.ts

export const useIndexStore = defineStore("index", {
    // other options...
    state: () => ({
        count: 0,
    }),
    getters: {
        doubleCount(): number {
            return this.count * 2;
        },
    },
    actions: {
        increment() {
            this.count++;
        },
    },
});
```
