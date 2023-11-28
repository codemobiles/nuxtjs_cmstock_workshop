# Nuxt 3 CMS Stock Course EP.104 - Workshop - Frontend - Report - Implement model in report controller

## Outcome

-   [x] Implement `model` in report controller

## Documentation for this episode

-   X

## Setup

1. Rename `top-5-price.ts` to `top-5-most-high-price.ts`

2. Rename `top-5-stock.ts` to `top-5-most-high-stock.ts`

3. Implement `model` in `top-5-most-high-price.ts`

```ts
// ~/server/api/v2/report/top-5-most-high-price.ts

import product from "@/server/models/product.model";

export default defineEventHandler(async (event) => {
    const result = await product.findAll({
        order: [["price", "DESC"]],
        limit: 5,
    });
    return result;
});
```

4. Implement `model` in `top-5-most-high-stock.ts`

```ts
// ~/server/api/v2/report/top-5-most-high-stock.ts

import product from "@/server/models/product.model";

export default defineEventHandler(async (event) => {
    const result = await product.findAll({
        order: [["stock", "DESC"]],
        limit: 5,
    });
    return result;
});
```
