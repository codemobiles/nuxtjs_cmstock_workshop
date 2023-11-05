# Nuxt 3 CMS Stock Course EP.9 - Dynamic Routing

## Outcome

-   Understand dynamic routing
-   Understand how to use `<nuxt-link>` tag

## Documentation for Router

https://masteringnuxt.com/blog/dynamic-pages-in-nuxt-3

## Setup

1. Create `demo/product` folder in `pages` folder

```
(project)/
| --- pages/
|      | --- demo/
|      |      | --- product/

```

2. Create `[id].vue` file in `demo/product` folder

```vue
<template>
    <div>
        <h1>Product Page</h1>
        <h2>Product ID: {{ route.params.id }}</h2>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped></style>
```

We can use `route` object to get the params from the URL

Example: `http://localhost:3000/demo/product/1` will return `1`

3. Try to access `http://localhost:3000/demo/product/1` and `http://localhost:3000/demo/product/2` and see the result
