# Nuxt 3 CMS Stock Course EP.79 - Workshop - Frontend - Product Service

## Outcome

-   [x] Use `product-api.service.ts` in `~/services/api/product-api.service.ts` to call API

## Documentation for this episode

-   X

## Setup

1. Create `product-api.service.ts` in `~/services/api/product-api.service.ts` and add the following code:

```ts
import { useFetcher } from "~/composables/useFetcher";
import type { CreateProductDto } from "~/types/dtos/create-product.dto";
import { server } from "~/utils/constants";

const { fetch } = useFetcher();

export const getProducts = async () => {
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
```
