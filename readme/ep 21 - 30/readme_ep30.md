# Nuxt 3 CMS Stock Course EP.30 - Module TailwindCSS

## Outcome

-   Understand how to install TailwindCSS in Nuxt 3 (Module)
-   Understand basic CLI commands for TailwindCSS
-   Understand how to use TailwindCSS in Nuxt 3

## Documentation for this episode

https://nuxt.com/modules/tailwindcss

## Setup

1. Add `@nuxtjs/tailwindcss` dependency to your project

```bash
# Using pnpm
pnpm add --save-dev @nuxtjs/tailwindcss
# Using yarn
yarn add --dev @nuxtjs/tailwindcss
# Using npm
npm install --save-dev @nuxtjs/tailwindcss
```

2. Add `@nuxtjs/tailwindcss` to the `modules` section of `nuxt.config.ts`

```ts
{
    modules: ["@nuxtjs/tailwindcss"];
}
```

3. Create `tailwind.config.js` file in the root of your project by running

```bash
npx tailwindcss init
```

```js
/** @type {import('tailwindcss').Config} */
export default {
    prefix: "tw-", // (Optional) You can add prefix for generated classes
    content: [],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

4. Create `~/pages/demo/modules/tailwind.vue` file

```vue
<template>
    <div>
        <h1 class="tw-text-red-700">Hello</h1>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
```

5. Go visit `/demo/modules/tailwindcss` and see the result

## Result

When we visit `http://localhost:3000/demo/modules/tailwind` we should see following result

![Result](../images/ep30/result1.png)
