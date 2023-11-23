# Nuxt 3 CMS Stock Course EP.77 - Workshop - Auth middleware

## Outcome

-   [x] Use `auth.global` middleware
-   [x] Implement `auth` middleware

## Documentation for this episode

-   X

## Setup

1. Add `auth.global.ts` inside `~/middleware/auth.global.ts`

```ts
// ~/middleware/auth.global.ts

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();

    // CHECK AUTH BY LAYOUT
    authStore.restoreSession();

    console.log("authStore.session.isLoggedIn", authStore.session.isLoggedIn);

    if (to.meta.layout === "default") {
        if (authStore.session.isLoggedIn) {
            if (to.path === "/") return await navigateTo("/stock");
            return;
        }
        return await navigateTo("/login");
    }
    if (authStore.session.isLoggedIn) {
        return await navigateTo("/stock");
    }
    return;
});
```

2. Add `index.vue` in `~/pages/index.vue`

```vue
<!-- ~/pages/index.vue -->

<template>
    <div></div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "authen",
});
</script>

<style scoped></style>
```

3. Update `stock.vue` in `~/pages/stock.vue`

```vue
<!-- ~/pages/stock.vue -->

<template>
    <div>
        <p>Stock</p>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "default",
});
</script>

<style scoped></style>
```

4. Update `auth.store.ts` in `~/stores/auth.store.ts`

```ts
//* ~/stores/auth.store.ts

import type { LoginDto } from "~/types/dtos/login.dto";
import type { RegisterDto } from "~/types/dtos/register.dto";
import { FetchingStatus } from "~/types/enums/FetchingStatus";
import { TSession } from "~/types/session.type";

export const useAuthStore = defineStore("auth", () => {
    const username = useCookie(server.TOKEN_KEY);
    const token = useCookie(server.TOKEN_KEY);
    const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init);
    const session = reactive<TSession>({
        isLoggedIn: false,
        username: undefined,
    });
    const router = useRouter();
    const api = useApi();

    const restoreSession = () => {
        if (!!token.value && !!username.value) {
            session.isLoggedIn = true;
            session.username = username.value!;
        } else {
            session.isLoggedIn = false;
        }
    };

    const login = async (loginDto: LoginDto) => {
        try {
            fetchingStatus.value = FetchingStatus.fetching;
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const { result, data } = await api.login(loginDto);
            if (result === "ok") {
                token.value = "DUMP TOKEN";
                username.value = data.username;
                fetchingStatus.value = FetchingStatus.success;
                message.success("Login successful");
                console.log("ล็อคอินสำเร็จ");
            } else {
                session.isLoggedIn = false;
                fetchingStatus.value = FetchingStatus.failed;
                message.error("Login Failed");
            }
            window.open("/stock", "_self");
        } catch (e) {
            console.log(e);

            session.isLoggedIn = false;
            fetchingStatus.value = FetchingStatus.failed;
            message.error("Something went wrong");
        }
    };

    const register = async (registerDto: RegisterDto) => {
        try {
            fetchingStatus.value = FetchingStatus.fetching;
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const result = await api.register(registerDto);
            if (result == true) {
                fetchingStatus.value = FetchingStatus.success;
                message.success("Register successful");
                return await navigateTo("/login", { redirectCode: 301 });
            } else {
                fetchingStatus.value = FetchingStatus.failed;
                message.error("Register Failed");
            }
        } catch (e) {
            fetchingStatus.value = FetchingStatus.failed;
            message.error("Something went wrong");
        }
    };

    const logout = async () => {
        username.value = null;
        token.value = null;
        session.isLoggedIn = false;
        session.username = undefined;
        message.success("Logout successful");
        return await navigateTo("/login");
    };

    const isLoading = () => fetchingStatus.value === FetchingStatus.fetching;

    return {
        login,
        register,
        logout,
        isLoading,
        restoreSession,
        session,
    };
});
```
