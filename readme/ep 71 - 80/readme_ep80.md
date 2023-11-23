# Nuxt 3 CMS Stock Course EP.80 - Workshop - Frontend - Product Store

## Outcome

-   [x] Use `product.store` store in `~/store/stock.store.ts` to call API
-   [x] Fetch data from API and display in `~/pages/stock.vue`

## Documentation for this episode

-   X

## Setup

1. Change `stock-api.service.ts` to `product-api.service.ts`

2. Add `product.store.ts` in `~/store/`

```ts
// ~/store/product.store.ts

import { FetchingStatus } from "~/types/enums/FetchingStatus";
import type { TProduct } from "~/types/product.type";

export const useProductStore = defineStore("product", () => {
    const products = ref<TProduct[]>([]);
    const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init);
    const api = useApi();

    // getter
    const setLoading = (status: FetchingStatus) => {
        fetchingStatus.value = status;
    };
    const isLoading = () => {
        return fetchingStatus.value === FetchingStatus.fetching;
    };

    const loadProducts = async () => {
        setLoading(FetchingStatus.fetching);
        try {
            const res = await api.getProducts();
            products.value = res;
        } catch (error) {
            products.value = [];
        } finally {
            setLoading(FetchingStatus.success);
        }
    };

    return {
        products,
        loadProducts,
    };
});
```

3. Update `useApi` in `~/composables/useApi.ts` by adding data from `product-api.service.ts`

```ts
// ~/composables/useApi.ts

import { login, register } from "@/services/api/auth-api.service";
import {
    getProducts,
    createProduct,
    deleteProduct,
    getProductById,
    updateProduct,
} from "@/services/api/product-api.service";
export const useApi = () => {
    return {
        login,
        register,
        getProducts,
        createProduct,
        deleteProduct,
        getProductById,
        updateProduct,
    };
};
```

4. Implement to `~/pages/stock.vue`

```vue
<!-- ~/pages/stock.vue -->

<template>
    <div>
        <p>{{ productStore.products }}</p>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "default",
});

const productStore = useProductStore();

productStore.loadProducts();
</script>

<style scoped></style>
```
