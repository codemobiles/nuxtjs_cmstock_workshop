# Nuxt 3 CMS Stock Course EP.76 - Workshop - Frontend - Logout

## Outcome

-   [x] Use `auth` store
-   [x] Create `logout` function
-   [x] Create `logout` logic in `Header` component

## Documentation for this episode

-   X

## Setup

1. Add `@click="authStore.logout()"` inside `Header.vue` in `~/components/layouts/core/Header.vue`

```vue
<template>
    <a-layout-header class="tw-p-0 !tw-bg-[#00B98Dff] tw-drop-shadow-md">
        <a-row
            align="start"
            justify="space-between"
            class="tw-items-center tw-h-full tw-px-4"
        >
            <a-tag ghost class="tw-rounded-lg tw-p-2">
                <span class="tw-font-bold tw-text-xl">
                    <a-row align="center" justify="space-between">
                        <AreaChartOutlined
                            class="tw-text-lg tw-pr-2 tw-text-white"
                        />
                        <span class="tw-text-white">
                            CMDev - Stock Workshop
                        </span>
                    </a-row>
                </span>
            </a-tag>
            <a-tag
                color="#EE2E31"
                class="tw-rounded-lg tw-px-4 tw-cursor-pointer"
                @click="authStore.logout()"
            >
                <a-row justify="center" class="!tw-items-center tw-pt-1">
                    <LogoutOutlined class="tw-text-lg" />
                    <!-- <span class="tw-font-bold tw-text-xl"> Logout </span> -->
                </a-row>
            </a-tag>
        </a-row>
    </a-layout-header>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
</script>

<style scoped></style>
```

2. Update `auth.store.ts` in `~/store/auth.store.ts`

```ts
// ~/store/auth.store.ts

import type { LoginDto } from "~/types/dtos/login.dto";
import type { RegisterDto } from "~/types/dtos/register.dto";
import { FetchingStatus } from "~/types/enums/FetchingStatus";
import { TSession } from "~/types/session.type";

export const useAuthStore = defineStore("auth", () => {
    const username = useCookie(server.TOKEN_KEY);
    const token = useCookie(server.TOKEN_KEY);
    const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init);
    const session = reactive<TSession>({ isLoggedIn: false });
    const router = useRouter();
    const api = useApi();

    const login = async (loginDto: LoginDto) => {
        try {
            fetchingStatus.value = FetchingStatus.fetching;
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const { result, data } = await api.login(loginDto);
            if (result === "ok") {
                session.username = data.username;
                session.isLoggedIn = true;
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
    };
});
```
