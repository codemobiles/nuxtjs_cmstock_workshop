# Nuxt 3 CMS Stock Course EP.56 - Constants

## Outcome

-   [x] Add `kResultOk` and `kResultError` in `~server/constants.ts`
-   [x] Update `response` and add `result` to response

## Documentation for this episode

-   X

## Setup

1. Create `constants.ts` in `~server` folder

```ts
// ~server/constants.ts

export const kResultOk = "ok";
export const kResultNok = "nok";
```

2. Implement `kResultOk` and `kResultNok` in `every` routes (that nessessary)

Example:

```ts
// ~server/api/v2/login.post.ts

import { LoginDto } from "~/types/dtos/login.dto";
import bcrypt from "bcryptjs";
import user from "~/server/models/user.model";
import { kResultOk } from "@/server/constants";

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
        result: kResultOk,
        data: {
            username: userData?.get("username"),
            level: userData?.get("level"),
            createdAt: userData?.get("createdAt"),
            updatedAt: userData?.get("updatedAt"),
        },
    };
});
```

3. You can update that by yourself
