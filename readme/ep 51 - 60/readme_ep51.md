# Nuxt 3 CMS Stock Course EP.51 - Workshop - Backend - createError and bcrypt

## Outcome

-   [x] Describe `createError` and `bcrypt`
-   [x] Create `createError` and `bcrypt` for backend in Nuxt3

## Documentation for this episode

-   X

## Setup

1. Add `mockData` in `~server/api/v2/login.post.ts`

```ts
const mockData = {
    email: "test@gmail.com",
    password: "$2a$10$m3KhGy5w2zsphZHAR39sg.YUH.nimyX0l4CkqsPCc94B1QrlsBGlS", //Plain: test1234
};
```

2. Add Login for handler in `~server/api/v2/login.post.ts`

```ts
import { LoginDto } from "~/types/dtos/login.dto";
import bcrypt from "bcryptjs";

const mockData = {
    email: "test@gmail.com",
    password: "$2a$10$m3KhGy5w2zsphZHAR39sg.YUH.nimyX0l4CkqsPCc94B1QrlsBGlS", //Plain: test1234
};

export default defineEventHandler(async (event) => {
    const body = await readBody<LoginDto>(event);
    //* Assume
    if (body.email !== mockData.email) {
        throw createError({
            //<-- createError: use for throw error and not forgot to set status code
            status: 401,
            message: "Invalid email or password",
        });
    }
    if (!(await bcrypt.compare(body.password, mockData.password))) {
        //<-- bcrypt: use for compare password
        throw createError({
            status: 401,
            message: "Invalid email or password",
        });
    }

    return body;
});
```
