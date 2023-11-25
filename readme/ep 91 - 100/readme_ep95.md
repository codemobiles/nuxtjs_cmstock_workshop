# Nuxt 3 CMS Stock Course EP.95 - Workshop - Frontend - Edit Product (Part 1)

## Outcome

-   [x] Create `edit.vue` in `~/pages/stock/edit.vue`

## Documentation for this episode

-   X

## Setup

1. Create `[id].vue` in `~/pages/stock/edit/[id].vue`

```vue
<!-- ~/pages/stock/edit/[id].vue -->

<template>
    <div>
        {{ route.params.id }}
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "default",
});
const route = useRoute();
</script>

<style scoped></style>
```

2. Add `router` when press edit button in `~/pages/stock/index.vue`

```vue
<!-- ~/pages/stock/index.vue -->

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

const { useBreakpoint } = Grid;

const breakpointState = useBreakpoint();

const productStore = useProductStore();

productStore.loadProducts();

const handleClickDelete = (id: number) => {
    // productStore.deleteProduct(id);
};

const handleClickEdit = (id: number) => {
    router.push(`/stock/edit/${id}`);
};
</script>

<style scoped></style>
```
