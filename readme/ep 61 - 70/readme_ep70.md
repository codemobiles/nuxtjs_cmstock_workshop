# Nuxt 3 CMS Stock Course EP.70 - Workshop - Frontend - Use API Composable (Login)

## Outcome

-   [x] Use API Composable
-   [x] Update check `url` with `slash` in `useFetcher`

## Documentation for this episode

-   X

## Setup

1. Update `useFetcher` in `~/composables/useFetcher.ts`

```ts
// ~/composables/useFetcher.ts

import {
    apiUrl,
    NOT_CONNECT_NETWORK,
    NETWORK_CONNECTION_MESSAGE,
} from "~/utils/constants";

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

const fetchConfig = {
    headers: {},
};

export const setAuthorizationHeader = (token: string) => {
    // @ts-ignore
    fetchConfig.headers.Authorization = `Bearer ${token}`;
};

export const clearAuthorizationHeader = () => {
    // @ts-ignore
    delete fetchConfig.headers.Authorization;
};

export const useFetcher = () => {
    // const isLoading = ref(false)

    const fetcher = async (url: string, options?: RequestInit | any) => {
        // isLoading.value = true

        try {
            //* Check first url start with slash or not

            url = url.startsWith("/") ? url : `/${url}`;

            const absoluteUrl = isAbsoluteURLRegex.test(url)
                ? url
                : `${apiUrl}${url}`;

            const response = (await $fetch(absoluteUrl, {
                ...fetchConfig,
                ...options,
            })) as any;

            // if (!response.ok) {
            //     throw new Error(`HTTP error! Status: ${response.status}`)
            // }

            return await response;
        } catch (error: any) {
            console.error(error);
            if (!error.response) {
                throw {
                    code: NOT_CONNECT_NETWORK,
                    message: NETWORK_CONNECTION_MESSAGE,
                };
            }
            throw error;
        }
    };

    return {
        fetch: fetcher,
        // isLoading
    };
};
```

2. Create `useApi.ts` in `~/composables/useApi.ts`

```ts
// ~/composables/useApi.ts

import { login, register } from "@/services/api/auth-api.service";
export const useApi = () => {
    return {
        login,
        register,
    };
};
```

3. Try to use `useApi` in `~/pages/login.vue`

```vue
<script setup lang="ts">
const onSubmit = () => {
    validate()
        .then(async () => {
            //# Add on this line
            api.login({
                username: modelRef.username,
                password: modelRef.password,
            });
            // await authStore.login(toRaw(modelRef));
        })
        .catch((err) => {
            console.log("error", err);
        });
};
</script>
```
