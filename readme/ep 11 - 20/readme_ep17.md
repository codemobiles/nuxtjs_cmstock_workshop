# Nuxt 3 CMS Stock Course EP.17 - Middleware

## Outcome

-   Learn behaviour of `middleware` in Nuxt 3
-   Learn when we have to use `middleware` in Nuxt 3
-   Learn how to implement `middleware` in `components` and `pages`

## Documentation for this episode

https://nuxt.com/docs/guide/directory-structure/composables

## Setup

1. Create `middleware` folder in `~/` directory

2. Create `~/middleware/demo-product-middleware.ts`

```ts
/* middleware/demo-product-middleware.ts */

//Product param id > 3 will be redirected to /demo/product
export default defineNuxtRouteMiddleware((to, from) => {
    if (+to.params.id > 3) {
        return navigateTo("/demo");
    }
});
```

3. In `pages/demo/product/_id.vue` add code following

```vue
<template>
    <div>
        <h1>Product Page</h1>
        <h2>Product ID: {{ route.params.id }}</h2>
        <h3>Color: {{ route.query.color }}</h3>
        <h3>Brand: {{ route.query.brand }}</h3>
        <NuxtLink active-class="active" to="/demo/product/1?color=black&brand=B"
            >Home Demo</NuxtLink
        >
        <h4>Random Arr: {{ randomEntry(arr) }}</h4>
        <h4>Price: {{ formatNumber(10000) }}</h4>
        <button @click="goTo('2')">Go to Product 2</button>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "demo-product",
    middleware: "demo-product-middleware", // <-- Add middleware here
});

const route = useRoute();
const router = useRouter();

const arr = [1, 2, 3, 4, 5];

const goTo = (id: string) => {
    router.push(`/demo/product/${id}?color=red&brand=A`);
    // router.push({
    //     path: `/demo/product/${id}`,
    //     query: {
    //         color: "red",
    //         brand: "A",
    //     },
    // });
};
</script>

<style scoped>
.active {
    color: red;
}
</style>
```

4. Visit `http://localhost:3000/demo/product/1` and `http://localhost:3000/demo/product/4` and see the result

## Result

When we visit `http://localhost:3000/demo/product/1` we will see this result in browser other than `http://localhost:3000/demo/product/4` will be redirected to `http://localhost:3000/demo`
