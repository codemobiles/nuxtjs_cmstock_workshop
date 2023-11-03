<template>
    <div>
        <div v-if="pending">Loading ...</div>
        <div v-else>
            {{ secretEnvResp }}
            <button @click="secretEnvResp = null">Reset</button>
        </div>
    </div>
</template>

<script setup lang="ts">
/* Navigation will occur before fetching is complete.
  Handle pending and error states directly within your component's template
*/
const { pending, data: secretEnvResp } = await useLazyFetch("/api/secret-env");
watch(secretEnvResp, (newPosts) => {
    console.log("newPosts", newPosts);

    // Because posts might start out null, you won't have access
    // to its contents immediately, but you can watch it.
});
</script>

<style scoped></style>
