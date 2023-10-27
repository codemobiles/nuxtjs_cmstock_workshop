<template>
    <div>
        <h1 class="mydivclass">{{ msg }}</h1>
        <input type="text" placeholder="Search">
        <h3>Image From public/</h3>
        <img src="./images/dog.jpeg" alt="Dog logo">
        <h3>Image From assets/</h3>
        <img src="~/assets/images/mountain.jpg" alt="Dog logo">
    </div>
</template>

<script setup lang="ts">
const msg = 'My CMS Stock application'
</script>

<style scoped>
.mydivclass {
    color: red;
}
</style>