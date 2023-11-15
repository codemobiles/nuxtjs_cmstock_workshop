# Nuxt 3 CMS Stock Course EP.54 - Workshop - Backend - Login and Register with Sequelize

## Outcome

-   [x] Implement `login` and `register` with `sequelize` and `sqlite`
-   [x] Update controller to use `bcrypt` to hash password

## Documentation for this episode

-   X

## Setup

1. Update `login.dto.ts` and `register.dto.ts` in `~types/dtos` folder

```ts
// ~types/dtos/login.dto.ts

export type LoginDto = {
    username: string;
    password: string;
};
```

```ts
// ~types/dtos/register.dto.ts

export type RegisterDto = {
    username: string;
    password: string;
};
```

2. Update `login.ts` and `register.ts` in `~server/api/v2` folder

```ts
// ~server/api/v2/register.ts

import { LoginDto } from "~/types/dtos/login.dto";
import bcrypt from "bcryptjs";
import user from "~/server/models/user.model";

export default defineEventHandler(async (event) => {
    const body = await readBody<LoginDto>(event);
    const userData = await user.findOne({
        where: {
            username: body.username,
        },
    });
    //* Assume
    if (body.username !== userData?.get("username")) {
        throw createError({
            status: 401,
            message: "Invalid email or password",
        });
    }

    if (
        !(await bcrypt.compare(
            body.password,
            userData?.get("password") as string
        ))
    ) {
        throw createError({
            status: 401,
            message: "Invalid email or password",
        });
    }

    return {
        result: "success",
        data: {
            username: userData?.get("username"),
            level: userData?.get("level"),
            createdAt: userData?.get("createdAt"),
            updatedAt: userData?.get("updatedAt"),
        },
    };
});
```

```ts
// ~server/api/v2/register.ts

import { RegisterDto } from "~/types/dtos/register.dto";
import bcrypt from "bcryptjs";
import user from "~/server/models/user.model";
export default defineEventHandler(async (event) => {
    const body = await readBody<RegisterDto>(event);
    body.password = await bcrypt.hash(body.password, 10);
    const userData = await user.findOne({ where: { username: body.username } });
    if (userData) {
        throw createError({
            status: 409,
            message: "Username already exists",
        });
    }
    const result = await user.create(body);
    return {
        username: result.get("username"),
        level: result.get("level"),
        createdAt: result.get("createdAt"),
        updatedAt: result.get("updatedAt"),
    };
});
```
