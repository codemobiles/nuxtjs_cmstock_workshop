<template>
    <a-row :gutter="[0, 10]">
        <a-col :span="24" class="tw-my-1 tw-mt-2"> </a-col>
        <a-col :span="24" class="tw-my-1">
            <a-col :span="24" class="tw-my-1">
                <a-card
                    class="tw-w-full tw-min-h-[75vh] tw-rounded-lg tw-drop-shadow-md"
                >
                    <a-row align="middle" justify="center" :gutter="[0, 10]">
                        <a-col :span="24">
                            <a-row justify="space-between" :gutter="[0, 10]">
                                <a-col :span="22">
                                    <a-auto-complete
                                        size="large"
                                        class="tw-w-full tw-drop-shadow-sm hover:tw-drop-shadow-md tw-transition-all"
                                        :options="
                                            productStore.autoCompleteOptions
                                        "
                                        @search="productStore.debouncedSearch"
                                        @select="productStore.onSelect"
                                        :default-active-first-option="false"
                                        :filter-option="false"
                                    >
                                        <template #placeholder>
                                            <SearchOutlined /> Input search
                                            text</template
                                        >
                                    </a-auto-complete>
                                </a-col>
                                <a-col :span="2">
                                    <a-button
                                        @click="$router.push('/stock/create')"
                                        class="tw-w-full tw-drop-shadow-sm hover:tw-drop-shadow-md tw-transition-all tw-flex tw-items-center tw-justify-center tw-border-white"
                                        shape="round"
                                        size="large"
                                        type="primary"
                                    >
                                        <span v-if="breakpointState.sm">
                                            NEW
                                        </span>
                                        <template #icon>
                                            <PlusCircleFilled
                                        /></template>
                                    </a-button>
                                </a-col>
                            </a-row>
                        </a-col>
                        <a-col :span="24">
                            <ProductTable
                                :products="productStore.products"
                                @handleClickDelete="handleClickDelete"
                                @handleClickEdit="handleClickEdit"
                            />
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import { Grid } from "ant-design-vue";

definePageMeta({
    layout: "default",
});

const { useBreakpoint } = Grid;

const breakpointState = useBreakpoint();

const productStore = useProductStore();

productStore.loadProducts();

const handleClickDelete = (id: number) => {
    // productStore.deleteProduct(id);
};

const handleClickEdit = (id: number) => {
    // productStore.editProduct(id);
};
</script>

<style scoped></style>
