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
