# Nuxt 3 CMS Stock Course EP.65 - Workshop - Frontend - Enums

## Outcome

-   [x] Create `enums`

## Documentation for this episode

-   X

## Setup

1. Create `FetchingStatus.ts` and `RequestType.ts` in `~/types/enums`

```ts
// ~/types/enums/FetchingStatus.ts

export enum FetchingStatus {
    init,
    fetching,
    success,
    error,
    failed,
}
```

```ts
// ~/types/enums/RequestType.ts
export enum RequestType {
    get,
    post,
    put,
    delete,
}
```
