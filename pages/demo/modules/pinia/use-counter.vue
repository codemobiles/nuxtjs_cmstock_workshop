<template>
    <div>
        {{ counter.count }}
        <h2>Double Count</h2>
        {{ counter.doubleCount }}
        <h2>Display Count</h2>
        {{ counter.displayCounterText }}
        <h2>Actions</h2>
        <a-button type="primary" @click="onClickIncrement">Increment</a-button>
        <a-button type="primary" danger @click="onClickDecrement"
            >Decrement</a-button
        >
        {{ counter.displayCounterTextFunc() }}
        <div class="tw-mt-12"></div>
        <a-input v-model:value="count">Count</a-input>
        <a-button type="primary" @click="onClickSetCount">Set count</a-button>
    </div>
</template>

<script setup lang="ts">
const count = ref("");
const counter = useCounterStore();

const onClickIncrement = () => {
    counter.increment();
};

const onClickDecrement = () => {
    counter.decrement();
};

const onClickSetCount = () => {
    console.log(count.value);

    counter.setCount(Number(count.value));
};
</script>

<style scoped></style>
