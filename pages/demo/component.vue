<template>
    <div>
        <DemoMyComponentOne
            first-line="This is my 1st"
            second-line="This is my 2nd"
            :balance="100"
        ></DemoMyComponentOne>
        <hr />
        <h1>My Component 2</h1>
        <DemoMyComponentTwo :author="author"></DemoMyComponentTwo>
    </div>
</template>

<script setup lang="ts">
import type { TAuthor } from "~/types/author.type";

const author = reactive<TAuthor>({
    firstName: "John",
    lastName: "Doe2",
    email: "john.doe@gmail.com",
    date: new Date(),
});
</script>

<style scoped></style>
