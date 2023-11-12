# Nuxt 3 CMS Stock Course EP.48 - Workshop - Backend - Params

## Outcome

-   [x] Overall routes for backend
-   [x] Create route with params for backend in Nuxt3

## Documentation for this episode

-   X

## Setup

1. Create files and folders in `~server/api/v2`

**_ GET `/api/v2/:id` _**

```ts
// ~server/api/v2/[id].ts
export default defineEventHandler((event) => {
    const id = getRouterParam(event, "id");
    return {
        message: "get product by id",
        id: id,
    };
});
```

**_ PUT `/api/v2/[id].ts` _**

```ts
// ~server/api/v2/[id].put.ts
export default defineEventHandler((event) => {
    const id = getRouterParam(event, "id");
    return {
        message: "put products",
        id: id,
    };
});
```

**_ DELETE `/api/v2/[id].delete.ts` _**

```ts
// ~server/api/v2/[id].delete.ts
export default defineEventHandler((event) => {
    const id = getRouterParam(event, "id");
    return {
        message: "delete products",
        id: id,
    };
});
```

**_ GET `/api/v2/name/[keyword].ts` _**

```ts
// ~server/api/v2/name/[keyword].ts

export default defineEventHandler((event) => {
    const keyword = getRouterParam(event, "keyword") || "";
    const keyWordDecoded = decodeURIComponent(keyword);
    return {
        message: "Search product",
        keyword: keyWordDecoded,
    };
});
```
