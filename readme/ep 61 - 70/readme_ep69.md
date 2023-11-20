# Nuxt 3 CMS Stock Course EP.69 - Workshop - Frontend - Auth API

## Outcome

-   [x] Create `auth-api.service.ts` for auth API
-   [x] Basic login and register API

## Documentation for this episode

-   X

## Setup

1. Create `auth-api.service.ts` in `~/services`

```ts
// ~/services/auth-api.service.ts

import type { TUser } from "~/types/user.type";
import { server, apiUrl } from "~/utils/constants";
import { useFetcher } from "~/composables/useFetcher";
import type { LoginDto } from "~/types/dtos/login.dto";
import type { RegisterDto } from "~/types/dtos/register.dto";

const { fetch } = useFetcher();

export const login = async (loginDto: LoginDto) => {
    const result = (await fetch(`${server.LOGIN_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDto),
    })) as Promise<any>;
    return result;
};

export const register = async (registerDto: RegisterDto) => {
    const result = await fetch(server.REGISTER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerDto),
    });
    if (result.result == "ok") {
        return true;
    }
    return false;
};
```
