<template>
    <div>
        <h1>Product Page</h1>
        <h2>Product ID: {{ route.params.id }}</h2>
        <h3>Color: {{ route.query.color }}</h3>
        <h3>Brand: {{ route.query.brand }}</h3>
        <NuxtLink active-class="active" to="/demo/product/1?color=black&brand=B"
            >Home Demo</NuxtLink
        >
        <h4>Random Arr: {{ randomEntry(arr) }}</h4>
        <h4>Price: {{ formatNumber(10000) }}</h4>
        <button @click="goTo('2')">Go to Product 2</button>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "demo-product",
});

const route = useRoute();
const router = useRouter();

const arr = [1, 2, 3, 4, 5];

const goTo = (id: string) => {
    router.push(`/demo/product/${id}?color=red&brand=A`);
    // router.push({
    //     path: `/demo/product/${id}`,
    //     query: {
    //         color: "red",
    //         brand: "A",
    //     },
    // });
};
</script>

<style scoped>
.active {
    color: red;
}
</style>
