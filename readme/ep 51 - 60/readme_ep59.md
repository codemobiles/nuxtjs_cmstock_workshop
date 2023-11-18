# Nuxt 3 CMS Stock Course EP.59 - Workshop - Backend - Test connection backend by using Nuxt 3 (Frontend)

## Outcome

-   [x] Use `$fetch` in Nuxt 3 to test connection backend

## Documentation for this episode

-   X

## Setup

1. Create `~/pages/demo/products/index.vue` for fetching all prodcuts

```vue
<template>
    <div>
        <h1>Products</h1>
        <div>
            <ul>
                <li v-for="product in products" :key="product.id">
                    <nuxt-link :to="`/demo/products/${product.id}`">
                        {{ product.name }}
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
const products = await $fetch(`/api/v2/products`);
</script>

<style scoped></style>
```

2. Create `~/pages/demo/products/[id].vue` for fetching one prodcut

```vue
<template>
    <div>
        <h3>{{ product.name }}</h3>
        <img :src="getFullImage(product.image)" :alt="product.name" />
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const product = await $fetch(`/api/v2/products/${route.params.id}`);

const getFullImage = (image: string) => {
    return `/uploaded/images/${image}`;
};
</script>

<style scoped></style>
```

3. Test by visit `http://localhost:3000/demo/products` and `http://localhost:3000/demo/products/1`
