# Nuxt 3 CMS Stock Course EP.87 - Workshop - Frontend - Autocomplete

## Outcome

-   [x] Implement `<a-autocomplete>` with `datatable` component (`search`)
-   [x] Add `autcomplete` logic in `store`

## Documentation for this episode

-   X

## Setup

1. Update `product-api.service.ts` in `~/services/api/product-api.service.ts` folder

```ts
// ~/services/api/product-api.service.ts

import { useFetcher } from "~/composables/useFetcher";
import type { CreateProductDto } from "~/types/dtos/create-product.dto";
import type { TProduct } from "~/types/product.type";
import { server } from "~/utils/constants";

const { fetch } = useFetcher();

export const getProducts = async (): Promise<TProduct[]> => {
    const result = await fetch(server.PRODUCT_URL);
    return result;
};

export const getProductById = async (id: string) => {
    const result = await fetch(`${server.PRODUCT_URL}/${id}`);
    return result;
};

export const createProduct = async (Product: CreateProductDto) => {
    const result = await fetch(server.PRODUCT_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Product),
    });
    return result;
};

export const updateProduct = async (id: string, Product: CreateProductDto) => {
    const result = await fetch(`${server.PRODUCT_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Product),
    });
    return result;
};

export const deleteProduct = async (id: string) => {
    const result = await fetch(`${server.PRODUCT_URL}/${id}`, {
        method: "DELETE",
    });
    return result;
};

export const getProductByKeyword = async (keyword: string) => {
    const result = await fetch(`${server.PRODUCT_URL}/name/${keyword}`);
    return result;
};
```

2. Update `useApi.ts` in `~/composables/useApi.ts` folder

```ts
// ~/composables/useApi.ts

import { login, register } from "@/services/api/auth-api.service";
import {
    getProducts,
    createProduct,
    deleteProduct,
    getProductById,
    updateProduct,
    getProductByKeyword,
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
        getProductByKeyword,
    };
};
```

3. Update `product.store.ts` in `~/store/product.store.ts` folder

```ts
// ~/store/product.store.ts

import { FetchingStatus } from "~/types/enums/FetchingStatus";
import type { TProduct } from "~/types/product.type";

export const useProductStore = defineStore("product", () => {
    const products = ref<TProduct[]>([]);
    const autoCompleteOptions = ref([]);
    const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init);
    const api = useApi();

    // getter
    const setLoading = (status: FetchingStatus) => {
        fetchingStatus.value = status;
    };
    const isLoading = () => {
        return fetchingStatus.value === FetchingStatus.fetching;
    };

    const debouncedSearch = async (search: string) => {
        //* Sleep 500ms
        setLoading(FetchingStatus.fetching);
        await new Promise((resolve) => setTimeout(resolve, 500));
        try {
            if (search) {
                const result = await api.getProductByKeyword(search);
                products.value = result.data;
                autoCompleteOptions.value = result.data.map((product: any) => ({
                    value: product.name,
                }));
            } else {
                await loadProducts();
            }
        } catch (error) {
        } finally {
            setTimeout(() => {
                setLoading(FetchingStatus.success);
            }, 500);
        }
    };

    const onSelect = async (value: any) => {
        setLoading(FetchingStatus.fetching);
        try {
            if (value) {
                const result = await api.getProductByKeyword(value);
                products.value = result.data;
            } else {
                await loadProducts();
            }
        } finally {
            setTimeout(() => {
                setLoading(FetchingStatus.success);
            }, 500);
        }
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
        autoCompleteOptions,
        debouncedSearch,
        products,
        loadProducts,
        isLoading,
        onSelect,
    };
});
```

4. Update `stock.vue` in `~/pages/stock.vue` folder

```vue
<!-- ~/pages/stock.vue -->

<template>
    <a-row :gutter="[0, 10]">
        <a-col :span="24" class="tw-my-1 tw-mt-2"> </a-col>
        <a-col :span="24" class="tw-my-1">
            <a-col :span="24" class="tw-my-1">
                <a-card
                    class="tw-w-full tw-min-h-[75vh] tw-rounded-lg tw-drop-shadow-md"
                >
                    <a-row align="middle" justify="center" :gutter="[0, 10]">
                        <a-col :span="24">
                            <a-row justify="space-between" :gutter="[0, 10]">
                                <a-col :span="22">
                                    <a-auto-complete
                                        size="large"
                                        class="tw-w-full tw-drop-shadow-sm hover:tw-drop-shadow-md tw-transition-all"
                                        :options="
                                            productStore.autoCompleteOptions
                                        "
                                        @search="productStore.debouncedSearch"
                                        @select="productStore.onSelect"
                                        :default-active-first-option="false"
                                        :filter-option="false"
                                    >
                                        <template #placeholder>
                                            <SearchOutlined /> Input search
                                            text</template
                                        >
                                    </a-auto-complete>
                                </a-col>
                                <a-col :span="2">
                                    <a-button
                                        @click="$router.push('/stock/create')"
                                        class="tw-w-full tw-drop-shadow-sm hover:tw-drop-shadow-md tw-transition-all tw-flex tw-items-center tw-justify-center tw-border-white"
                                        shape="round"
                                        size="large"
                                        type="primary"
                                    >
                                        <span v-if="breakpointState.sm">
                                            NEW
                                        </span>
                                        <template #icon>
                                            <PlusCircleFilled
                                        /></template>
                                    </a-button>
                                </a-col>
                            </a-row>
                        </a-col>
                        <a-col :span="24">
                            <ProductTable
                                :products="productStore.products"
                                @handleClickDelete="handleClickDelete"
                                @handleClickEdit="handleClickEdit"
                            />
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import { Grid } from "ant-design-vue";

definePageMeta({
    layout: "default",
});

const { useBreakpoint } = Grid;

const breakpointState = useBreakpoint();

const productStore = useProductStore();

productStore.loadProducts();

const handleClickDelete = (id: number) => {
    // productStore.deleteProduct(id);
};

const handleClickEdit = (id: number) => {
    // productStore.editProduct(id);
};
</script>

<style scoped></style>
```
