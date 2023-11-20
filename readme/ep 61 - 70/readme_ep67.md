# Nuxt 3 CMS Stock Course EP.67 - Workshop - Frontend - Auth store

## Outcome

-   [x] Create `auth` store using `Pinia`
-   [x] Import `useAuthStore` in `Login` page

## Documentation for this episode

-   X

## Setup

1. Create `auth.store.ts`

```ts
//~/stores/auth.store.ts

import { FetchingStatus } from "~/types/enums/FetchingStatus";
import { TSession } from "~/types/session.type";

export const useAuthStore = defineStore("auth", () => {
    const username = useCookie(server.TOKEN_KEY);
    const token = useCookie(server.TOKEN_KEY);
    const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init);
    const session = reactive<TSession>({ isLoggedIn: false });
    const router = useRouter();
});
```

2. Add `useAuthStore` in `Login` page

```vue
<script setup lang="ts">
..
..
const authStore = useAuthStore();
</script>
```
