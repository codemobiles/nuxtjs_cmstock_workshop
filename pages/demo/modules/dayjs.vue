<template>
    <div>
        Dayjs {{ $dayjs().format() }}
        <p>7 Day Later: {{ sevenDayLater.format() }}</p>
        <p>Date diff: {{ dateDiff }}</p>
    </div>
</template>

<script setup lang="ts">
const dayjs = useDayjs();

const sevenDayLater = dayjs().add(7, "day");
const dateDiff = sevenDayLater.diff(dayjs(), "day");
</script>

<style scoped></style>
