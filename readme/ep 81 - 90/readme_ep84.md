# Nuxt 3 CMS Stock Course EP.84 - Workshop - Frontend - Product Datatable Part 2 (Format Data)

## Outcome

-   [x] Implement `Intl` with `datatable` component (`price`, `stock`)

## Documentation for this episode

-   X

## Setup

1. Create `useFormats.ts` in `composables` folder

```ts
// ~/composables/useFormats.ts

export const useFormat = () => {
    const toQuantity = (value = 0) => {
        return value.toLocaleString("th-TH", { minimumFractionDigits: 2 });
    };

    const toCurrency = (value = 0) => {
        return Intl.NumberFormat("th-TH", {
            style: "currency",
            currency: "THB",
        }).format(value);
    };

    return {
        toQuantity,
        toCurrency,
    };
};
```

2. Uncomment some code in `ProductTable.vue`

```vue
<!-- ~/components/ProductTable.vue -->

<template>
    <a-table
        :columns="columns"
        :data-source="props.products"
        :loading="productStore.isLoading()"
        :scroll="{
            x: 200,
        }"
    >
        <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
                <span> Name </span>
            </template>
        </template>
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
                <a @click="handleClickEdit(record.id)">
                    {{ record.name }}
                </a>
            </template>
            <!-- <template v-else-if="column.key === 'image'">
                <a-image
                    :src="getFullImagePath(record.image)"
                    height="35px"
                    class="tw-object-contain"
                />
            </template> -->
            <template v-else-if="column.key === 'stock'">
                <span>{{ formats.toQuantity(record.stock) }}</span>
            </template>
            <template v-else-if="column.key === 'price'">
                <span> {{ formats.toCurrency(record.price) }}</span>
            </template>
            <template v-else-if="column.key == 'createdAt'">
                <span class="tw-opacity-80">
                    {{ dayjs(record.createdAt).format("DD/MM/YY • hh:mm") }}
                </span>
            </template>
            <template v-else-if="column.key == 'updatedAt'">
                <span class="tw-opacity-80">
                    {{ dayjs(record.updatedAt).format("DD/MM/YY • hh:mm") }}
                </span>
            </template>
            <template v-else-if="column.key === 'action'">
                <a-row>
                    <a-button
                        class="tw-bg-[#ffc43d] tw-text-white tw-rounded-lg tw-mr-2"
                        @click="handleClickEdit(record.id)"
                    >
                        <span><EditOutlined /> </span>
                    </a-button>
                    <a-button
                        type="primary"
                        danger
                        class="tw-rounded-lg"
                        @click="handleClickDelete(record.id)"
                    >
                        <span> <DeleteOutlined /> </span>
                    </a-button>
                </a-row>
            </template>
        </template>
    </a-table>
</template>

<script setup lang="ts">
const formats = useFormat();
const columns = [
    {
        title: "Image",
        dataIndex: "image",
        key: "image",
    },
    {
        name: "Name",
        dataIndex: "name",
        key: "name",
        width: "30%",
    },

    {
        title: "Stock",
        dataIndex: "stock",
        key: "stock",
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
    },
    {
        title: "Created At",
        key: "createdAt",
        dataIndex: "createdAt",
    },
    {
        title: "Updated At",
        key: "updatedAt",
        dataIndex: "updatedAt",
    },
    {
        title: "Action",
        key: "action",
    },
];

const productStore = useProductStore();
const dayjs = useDayjs();

const props = defineProps({
    products: {
        type: Array,
        required: true,
    },
});

const emits = defineEmits(["handleClickDelete", "handleClickEdit"]);

const handleClickEdit = (id: number) => {
    emits("handleClickEdit", id);
};

const handleClickDelete = (id: number) => {
    emits("handleClickDelete", id);
};
</script>

<style scoped></style>
```

3. Update `stock.vue`

```vue
<!-- ~/pages/stock.vue -->

<template>
    <a-row :gutter="[0, 10]">
        <a-col :span="24" class="tw-my-1 tw-mt-2"> </a-col>
        <a-col :span="24" class="tw-my-1">
            <a-col :span="24" class="tw-my-1">
                <a-card
                    class="tw-w-full tw-min-h-[75vh] tw-rounded-lg tw-drop-shadow-md"
                >
                    <a-row align="middle" justify="center" :gutter="[0, 10]">
                        <a-col :span="24"> </a-col>
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
definePageMeta({
    layout: "default",
});

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
```
