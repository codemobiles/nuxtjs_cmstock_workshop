<template>
    <div>
        <h1>This is default Layout</h1>
        <NuxtLoadingIndicator color="red" :height="400" />

        <slot></slot>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
