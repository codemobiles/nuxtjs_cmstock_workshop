# Nuxt 3 CMS Stock Course EP.48 - Workshop - Backend - All Routes

## Outcome

-   [x] Overall routes for backend
-   [x] Create all routes for backend in Nuxt3

## Documentation for this episode

-   X

## Setup

1. Create files and folders in `~server/api/v2`

**_ POST `/api/v2/login` _**

```ts
// ~server/api/v2/login.post.ts
export default defineEventHandler((event) => {
    return {
        hello: "from post login",
    };
});
```

**_ POST `/api/v2/register` _**

```ts
// ~server/api/v2/register.post.ts
export default defineEventHandler((event) => {
    return {
        hello: "from post register",
    };
});
```

**_ GET `/api/v2/products` _**

```ts
// ~server/api/v2/products/index.ts
export default defineEventHandler((event) => {
    return {
        hello: "fetch products",
    };
});
```

**_ GET `/api/v2/products/name/:keyword` _**

```ts
// ~server/api/v2/products/name/[keyword].ts
export default defineEventHandler((event) => {
    const keyword = getRouterParam(event, "keyword") || "";
    const keyWordDecoded = decodeURIComponent(keyword);
    return {
        message: "Search product",
        keyword: keyWordDecoded,
    };
});
```

**_ POST `/api/v2/products` _**

```ts
// ~server/api/v2/products/index.post.ts
export default defineEventHandler((event) => {
    return {
        hello: "post products",
    };
});
```

**_ PUT `/api/v2/products/:id` _**

```ts
// ~server/api/v2/products/[id].put.ts
export default defineEventHandler((event) => {
    return {
        hello: "put products",
    };
});
```

**_ DELETE `/api/v2/products/:id` _**

```ts
// ~server/api/v2/products/[id].delete.ts
export default defineEventHandler((event) => {
    return {
        hello: "delete products",
    };
});
```
