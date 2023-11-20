# Nuxt 3 CMS Stock Course EP.68 - Workshop - Frontend - Use fetcher

## Outcome

-   [x] Create `useFetcher` composable

## Documentation for this episode

-   X

## Setup

1. Create `useFetcher.ts` in `~/composables`

```ts
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
