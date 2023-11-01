<template>
    <div>
        <h2>Author Book</h2>
        <p>FirstName: {{ author.firstName }}</p>
        <p>Lastname: {{ author.lastName }}</p>
        <p>Email: {{ author.email }}</p>
        <p>Date: {{ author.date }}</p>
    </div>
</template>

<script setup lang="ts">
import { type TAuthor } from "@/types/author.type";

const props = defineProps({
    author: {
        type: Object as PropType<TAuthor>,
        required: true,
        default: () => ({} as TAuthor),
    },
});
</script>

<style scoped></style>
