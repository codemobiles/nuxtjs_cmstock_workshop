# Nuxt 3 CMS Stock Course EP.12 - Type vs Interface

## Outcome

-   Understand the difference between `type` and `interface`
-   Learn how to use `reactive` in component

## Documentation for this episode

https://blog.logrocket.com/types-vs-interfaces-typescript/

## Setup

1. Add following in `components.vue`

```vue
/* pages/component.vue */

<template>
    <div>
        <DemoMyComponentOne
            first-line="This is my 1st"
            second-line="This is my 2nd"
            :balance="100"
        ></DemoMyComponentOne>
    </div>
</template>

<script setup lang="ts">
type CarType = "Sedan" | "SUV" | "Hatchback";

// interface Car {
//     brand: string;
//     model: string;
//     year: number;
//     type: CarType;
// }

type Car = {
    brand: string;
    model: string;
    year: number;
    type: CarType;
};
const car = reactive<Car>({
    brand: "Toyota",
    model: "Corolla",
    year: 2000,
    type: "Sedan",
});
</script>

<style scoped></style>
```
