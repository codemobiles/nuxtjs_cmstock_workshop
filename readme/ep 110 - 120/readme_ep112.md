# Nuxt 3 CMS Stock Course EP.112 - Workshop - Frontend - PageView Server

## Outcome

-   [x] Add `pageview` logic in Backend
-   [x] Test `pageview` by postman

## Documentation for this episode

-   X

## Setup

1. Create `pageview.ts` in `~/server/api/v2/pageview.ts`

```ts
// ~/server/api/v2/pageview.ts

import dayjs from "dayjs";

const startAt = dayjs().format();
let pageview = 0;

export default defineEventHandler((event) => {
    return {
        startAt,
        pageview: ++pageview,
    };
});
```
