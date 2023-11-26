<template>
    <a-row :gutter="[0, 10]">
        <a-col :span="24" class="tw-my-1 tw-mt-2">
            <a-row :gutter="[0, 10]" align="middle" justify="center">
                <a-col
                    :span="6"
                    v-for="(item, i) in stockCardList"
                    :key="i"
                    class="tw-pr-2"
                >
                    <StockCard
                        :title="item.title"
                        :amount="item.amount"
                        :color="item.color"
                        :icon="item.icon"
                    ></StockCard>
                </a-col>
            </a-row>
        </a-col>
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
        <a-col :span="24">
            <a-modal v-model:visible="visible">
                <p class="tw-font-medium">
                    <a-row align="top" class="tw-items-center">
                        <DeleteOutlined class="tw-mr-2 tw-text-red-500" spin />
                        Are you sure delete this product?
                    </a-row>
                </p>
                <template #footer>
                    <a-button @click="closeDeleteModal">Cancel</a-button>
                    <a-button
                        danger
                        type="primary"
                        html-type="submit"
                        :loading="productStore.isLoading()"
                        @click="handleConfirmDelete"
                        >Delete
                    </a-button>
                </template>
            </a-modal>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import { Grid } from "ant-design-vue";
import {
    ShoppingCartOutlined,
    SearchOutlined,
    RollbackOutlined,
    GiftOutlined,
    PlusCircleFilled,
} from "@ant-design/icons-vue";

definePageMeta({
    layout: "default",
});

const router = useRouter();

const visible = ref(false);

const stockCardList = ref([
    {
        title: "Total",
        amount: 1800,
        icon: ShoppingCartOutlined,
        color: "#00B98D",
    },
    { title: "Sold out", amount: 20, icon: SearchOutlined, color: "#058C42" },
    { title: "Return", amount: 4, icon: RollbackOutlined, color: "#04471C" },
    {
        title: "Discount",
        amount: 2,
        icon: GiftOutlined,
        color: "#0D2818",
    },
]);

const deleteProductId = ref(-1);

const { useBreakpoint } = Grid;

const breakpointState = useBreakpoint();

const productStore = useProductStore();

const api = useApi();

productStore.loadProducts();

const handleClickDelete = (id: number) => {
    deleteProductId.value = id;
    visible.value = true;
};

const closeDeleteModal = () => {
    deleteProductId.value = -1;
    visible.value = false;
};

const handleClickEdit = (id: number) => {
    router.push(`/stock/edit/${id}`);
};

const handleConfirmDelete = async () => {
    await productStore.deleteProduct(deleteProductId.value.toString());
    closeDeleteModal();
};
</script>

<style scoped></style>
