<template>
    <div>
        {{ ping.ping() }}
        {{ ping.pong() }}
    </div>
</template>

<script setup lang="ts">
const ping = usePingpong();
</script>

<style scoped></style>
