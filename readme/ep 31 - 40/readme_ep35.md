# Nuxt 3 CMS Stock Course EP.35 - Antdv Theme

## Outcome

-   [x] Setup Antdv theme for Nuxt 3
-   [x] Setup Antdv theme in `<a-config-provider>` tag

## Documentation for this episode

https://antdv.com/docs/vue/customize-theme

## Setup

(Optional) If you want to fix `conflict` between `TailwindCSS` and `Antdv` on `Button` color, following code below

```js
//* tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
   ...
    corePlugins: {
        preflight: false,
    },
    ...
};
```

1. Add `<a-config-provider>` tag in `~/layouts/default.vue`

```vue
<template>
    ... ...
    <a-config-provider
        :theme="{
            token: {
                colorPrimary: '#00b96b',
                colorPrimary2: '#00a',
            },
        }"
    >
        <slot></slot>
    </a-config-provider>
    ... ...
</template>
```

2. Create file in `~pages/demo/modules/antdv/antdv-button.vue` and add code below

```vue
<template>
    <div>
        <a-button
            :style="{
                backgroundColor: token.colorPrimary2,
                color: '#fff',
            }"
            >Submit</a-button
        >
    </div>
</template>

<script setup lang="ts">
import { theme } from "ant-design-vue";
const { useToken } = theme;
const { token } = useToken();
</script>

<style scoped></style>
```

3. Go visit `http://localhost:3000/demo/modules/antdv/antdv-button` and see the result

## Result

When we visit `http://localhost:3000/demo/modules/antdv/antdv-button` we should see following result

![Result](../images/ep35/result1.png)
