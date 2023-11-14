# Nuxt 3 CMS Stock Course EP.50 - Workshop - Backend - Request body

## Outcome

-   [x] Overall routes for backend
-   [x] Create route with params for backend in Nuxt3

## Documentation for this episode

-   X

## Setup

1. Add `dto` for `login` and `register` in `~types/dtos`

```ts
// ~types/dtos/login.dto.ts
export type LoginDto = {
    email: string;
    password: string;
};
```

```ts
// ~types/dtos/register.dto.ts
export type RegisterDto = {
    email: string;
    password: string;
};
```

2. Update `~server/api/v2`

**_ POST `/api/v2/login` _**

```ts
// ~server/api/v2/login.post.ts
import { LoginDto } from "~/types/dtos/login.dto";

export default defineEventHandler(async (event) => {
    const body = await readBody<LoginDto>(event);
    return body;
});
```

**_ POST `/api/v2/register` _**

```ts
// ~server/api/v2/register.post.ts
import { RegisterDto } from "~/types/dtos/register.dto";
import bcrypt from "bcryptjs";
export default defineEventHandler(async (event) => {
    const body = await readBody<RegisterDto>(event);
    body.password = await bcrypt.hash(body.password, 10);
    return body;
});
```
