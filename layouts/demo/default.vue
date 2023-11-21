<template>
    <div>
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
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
