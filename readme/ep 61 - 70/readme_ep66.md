# Nuxt 3 CMS Stock Course EP.66 - Workshop - Frontend - Types

## Outcome

-   [x] Create `types` and `models`

## Documentation for this episode

-   X

## Setup

1. Create `product.type.ts`, `user.type.ts` and `session.type.ts` in `~/types`

```ts
// ~/types/product.type.ts

export type TProduct = {
    id: number;
    name: string;
    image: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
};
```

```ts
// ~/types/user.type.ts

export type TUser = {
    id: number;
    username: string;
    level: string;
    createdAt: Date;
    updatedAt: Date;
};
```

```ts
// ~/types/session.type.ts

export type TSession = {
    username?: string;
    isLoggedIn: boolean;
};
```
