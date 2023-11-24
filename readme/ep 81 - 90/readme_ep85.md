# Nuxt 3 CMS Stock Course EP.85 - Workshop - Frontend - Product Datatable Part 3 (Image)

## Outcome

-   [x] Implement `<a-image>` with `datatable` component (`image`)

## Documentation for this episode

-   X

## Setup

Download `uploaded.zip` from [here](../../uploaded.zip) and extract to `~/public` folder

1. Create `useImage.ts` in `composables` folder

```ts
// ~/composables/useImage.ts

export const getFullImagePath = (image: string) => {
    return `${imageUrl}/${image}`;
};
```

2. Update code in `ProductTable.vue`

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
            <template v-else-if="column.key === 'image'">
                <a-image
                    :src="getFullImagePath(record.image)"
                    height="35px"
                    class="tw-object-contain"
                />
            </template>
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
