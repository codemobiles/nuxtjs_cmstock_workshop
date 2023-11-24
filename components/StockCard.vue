<template>
    <a-card
        class="tw-w-full tw-h-full tw-rounded-lg tw-drop-shadow-md hover:tw-drop-shadow-lg tw-cursor-pointer tw-transition-all"
    >
        <a-row justify="space-between" align="middle" class="tw-items-center">
            <div>
                <a-tag :color="props.color" class="tw-rounded-md tw-p-4">
                    <props.icon class="tw-text-xl" />
                </a-tag>
                <span class="tw-font-medium tw-text-lg tw-text-gray-600">
                    {{ props.title }}</span
                >
            </div>
            <div>
                <span class="tw-font-bold tw-text-lg">{{
                    formats.toCurrency(props.amount)
                }}</span>
            </div>
        </a-row>
    </a-card>
</template>
<script setup lang="ts">
const formats = useFormat();
const props = defineProps<{
    title: string;
    amount: number;
    color: string;
    icon: any;
}>();
</script>
