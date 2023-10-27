# Nuxt 3 CMS Stock Course EP.3

## Outcome

- Understand the context in .vue file
- Know how to use `setup` in script tag

## Code

```vue
<template>
    <div>
        <h1 class="mydivclass">{{ msg }}</h1>
        <input type="text" placeholder="Search">
    </div>
</template>

<script setup lang="ts">
const msg = 'My CMS Stock application'
</script>

<style scoped>
.mydivclass {
    color: red;
}
</style>
```
