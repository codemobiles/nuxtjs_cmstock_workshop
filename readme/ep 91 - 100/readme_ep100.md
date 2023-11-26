# Nuxt 3 CMS Stock Course EP.100 - Workshop - Frontend - Move CRUD to Store and Summarize

## Outcome

-   [x] Move CRUD to store
-   [x] Summarize EP 90 - 100

## Documentation for this episode

-   X

## Setup

1. Create `update-product.dto.ts` in `~/types/dtos` as below

```ts
// ~/types/dtos/update-product.dto.ts

export type UpdateProductDto = {
    name: string;
    image: string;
    price: number;
    stock: number;
};
```

2. Update `product.store.ts` in `~/stores` as below

```ts
// ~/stores/product.store.ts

import { FetchingStatus } from "~/types/enums/FetchingStatus";
import type { TProduct } from "~/types/product.type";
import type { UploadChangeParam } from "ant-design-vue";

export const useProductStore = defineStore("product", () => {
    const products = ref<TProduct[]>([]);
    const autoCompleteOptions = ref([]);
    const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init);
    const api = useApi();
    const preview = reactive({
        visible: false,
        title: "",
    });

    //@ts-ignore
    const handlePreview = async (file: UploadProps["fileList"][number]) => {
        preview.visible = true;
        preview.title =
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
    };

    // getter
    const setLoading = (status: FetchingStatus) => {
        fetchingStatus.value = status;
    };
    const isLoading = () => {
        return fetchingStatus.value === FetchingStatus.fetching;
    };

    const debouncedSearch = async (search: string) => {
        //* Sleep 500ms
        setLoading(FetchingStatus.fetching);
        await new Promise((resolve) => setTimeout(resolve, 500));
        try {
            if (search) {
                const result = await api.getProductByKeyword(search);
                products.value = result.data;
                autoCompleteOptions.value = result.data.map((product: any) => ({
                    value: product.name,
                }));
            } else {
                await loadProducts();
            }
        } catch (error) {
        } finally {
            setTimeout(() => {
                setLoading(FetchingStatus.success);
            }, 500);
        }
    };

    const onSelect = async (value: any) => {
        setLoading(FetchingStatus.fetching);
        try {
            if (value) {
                const result = await api.getProductByKeyword(value);
                products.value = result.data;
            } else {
                await loadProducts();
            }
        } finally {
            setTimeout(() => {
                setLoading(FetchingStatus.success);
            }, 500);
        }
    };

    const loadProducts = async () => {
        setLoading(FetchingStatus.fetching);
        try {
            const res = await api.getProducts();
            products.value = res;
        } catch (error) {
            products.value = [];
        } finally {
            setLoading(FetchingStatus.success);
        }
    };

    const handleChange = (info: UploadChangeParam) => {
        if (info.file.status === "uploading") {
            setLoading(FetchingStatus.fetching);
            return "";
        }
        if (info.file.status === "done") {
            console.log("handleUpload");
            const target = info.file.originFileObj as any;
            const fileURL = URL.createObjectURL(target);
            const previewImageUrl = fileURL;
            setLoading(FetchingStatus.success);
            return previewImageUrl;
        }
        if (info.file.status === "removed") {
            setLoading(FetchingStatus.success);
            message.error("file was removed");
            return { status: info.file.status };
        }
        if (info.file.status === "error") {
            setLoading(FetchingStatus.failed);
            message.error("upload error");
            return { status: info.file.status };
        }
    };

    const handleCancel = () => {
        preview.visible = false;
        preview.title = "";
    };

    return {
        handleChange,
        autoCompleteOptions,
        debouncedSearch,
        products,
        loadProducts,
        isLoading,
        onSelect,
        handlePreview,
        preview,
        handleCancel,
    };
});
```

3. Change use `api` to `productStore` instead

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
```

```vue
<!-- ~/pages/stock/create.vue -->

<template>
    <a-row class="tw-mb-4">
        <a-col :span="24">
            <a-card
                class="tw-drop-shadow-md hover:tw-drop-shadow-lg tw-transition-all tw-rounded-lg"
            >
                <a-form
                    :label-col="{ span: 24 }"
                    :wrapper-col="{ span: 24 }"
                    class="tw-w-full"
                >
                    <a-row align="middle" justify="center">
                        <a-col :span="16">
                            <a-row
                                align="middle"
                                justify="center"
                                class="tw-w-full"
                                :gutter="[10, 0]"
                            >
                                <a-col
                                    :span="24"
                                    class="tw-flex tw-justify-center"
                                >
                                    <a-tag
                                        color="success"
                                        class="tw-font-medium tw-text-xl tw-rounded-lg tw-px-4 tw-mb-4"
                                    >
                                        NEW PRODUCT
                                    </a-tag>
                                </a-col>
                                <a-col
                                    :span="24"
                                    class="tw-flex tw-justify-center tw-w-full"
                                >
                                    <a-form-item
                                        label="Name"
                                        class="tw-font-medium tw-w-full"
                                        v-bind="validateInfos.name"
                                    >
                                        <a-input
                                            v-model:value="modelRef.name"
                                            @blur="
                                                validate('name', {
                                                    trigger: 'blur',
                                                }).catch(() => {})
                                            "
                                        />
                                    </a-form-item>
                                </a-col>
                                <a-col
                                    :span="12"
                                    class="tw-flex tw-justify-center"
                                >
                                    <a-form-item
                                        label="Price"
                                        class="tw-font-medium tw-w-full"
                                        v-bind="validateInfos.price"
                                    >
                                        <a-input
                                            v-model:value="modelRef.price"
                                            type="number"
                                            @blur="
                                                validate('price', {
                                                    trigger: 'blur',
                                                }).catch(() => {})
                                            "
                                        />
                                    </a-form-item>
                                </a-col>
                                <a-col
                                    :span="12"
                                    class="tw-flex tw-justify-center"
                                >
                                    <a-form-item
                                        label="Stock"
                                        v-bind="validateInfos.stock"
                                        class="tw-font-medium tw-w-full"
                                    >
                                        <a-input
                                            type="number"
                                            v-model:value="modelRef.stock"
                                            @blur="
                                                validate('stock', {
                                                    trigger: 'blur',
                                                }).catch(() => {})
                                            "
                                        />
                                    </a-form-item>
                                </a-col>
                                <a-col
                                    :span="24"
                                    class="tw-flex tw-justify-center"
                                >
                                    <a-form-item
                                        label="Image file"
                                        class="tw-font-medium tw-w-full"
                                        v-bind="validateInfos.image"
                                    >
                                        <a-upload
                                            v-model="modelRef.image"
                                            :max-count="1"
                                            name="image"
                                            list-type="picture-card"
                                            class="avatar-uploader"
                                            :show-upload-list="true"
                                            :before-upload="
                                                formats.beforeUpload
                                            "
                                            @change="handleUploadChange"
                                            @preview="
                                                productStore.handlePreview
                                            "
                                        >
                                            <div slot="trigger">
                                                <!-- <loading-outlined v-if="loading"></loading-outlined>
                        <plus-outlined v-else></plus-outlined> -->
                                                <div class="ant-upload-text">
                                                    Upload
                                                </div>
                                            </div>
                                        </a-upload>
                                        <a-modal
                                            :visible="
                                                productStore.preview.visible
                                            "
                                            :title="productStore.preview.title"
                                            :footer="null"
                                            @cancel="productStore.handleCancel"
                                        >
                                            <img
                                                :src="previewImageUrl!"
                                                alt="example"
                                                style="width: 100%"
                                            />
                                        </a-modal>
                                    </a-form-item>
                                </a-col>
                                <a-col
                                    :span="24"
                                    class="tw-flex tw-justify-center"
                                >
                                    <a-form-item class="tw-w-full">
                                        <a-row justify="end">
                                            <a-button
                                                @click="$router.push('/stock')"
                                                >Cancel</a-button
                                            >
                                            <a-button
                                                class="tw-ml-2"
                                                @click="resetFields"
                                                >Reset</a-button
                                            >
                                            <a-button
                                                type="primary"
                                                class="tw-ml-2"
                                                @click.prevent="onSubmit"
                                                >Create</a-button
                                            >
                                        </a-row>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>
                </a-form>
            </a-card>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import { Form } from "ant-design-vue";
import type { UploadChangeParam } from "ant-design-vue";

definePageMeta({
    layout: "default",
});

const useForm = Form.useForm;
const router = useRouter();
const formats = useFormat();
const api = useApi();
const productStore = useProductStore();
const modelRef = reactive({
    name: "",
    price: "",
    stock: "",
    image: null as any,
});

const previewImageUrl = ref<string | null>(null);

const rulesRef = reactive({
    name: [
        {
            required: true,
            message: "Please input name",
        },
    ],
    price: [
        {
            required: true,
            message: "Please input price",
        },
    ],
    stock: [
        {
            required: true,
            message: "Please input amount of stock",
        },
    ],
    // image: [
    //     {
    //         required: true,
    //         message: "Please select image",
    //     },
    // ],
});

const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);

const onSubmit = async () => {
    validate()
        .then(async () => {
            await productStore.createProduct({
                image: modelRef.image,
                name: modelRef.name,
                price: +modelRef.price || 0,
                stock: +modelRef.stock || 0,
            });
            router.push("/stock");
        })
        .catch((err) => {
            console.log(err);
        });
};

const handleUploadChange = (info: UploadChangeParam) => {
    // for preview
    const res = productStore.handleChange(info) as any;
    const status = res?.status;
    if (status == "removed") {
        modelRef.image = null;
        previewImageUrl.value = null;
        return;
    }
    previewImageUrl.value = res;

    // for upload
    modelRef.image = formats.convertToFile(info);
};
</script>

<style scoped></style>
```

```vue
<!-- ~/pages/stock/edit/[id].vue -->

<template>
    <a-row class="tw-mb-4">
        <a-col :span="24">
            <a-card
                class="tw-drop-shadow-md hover:tw-drop-shadow-lg tw-transition-all tw-rounded-lg"
            >
                <a-form
                    :label-col="{ span: 24 }"
                    :wrapper-col="{ span: 24 }"
                    class="tw-w-full"
                >
                    <a-row align="center" justify="center">
                        <a-col :span="16">
                            <a-row
                                align="center"
                                justify="center"
                                class="tw-w-full"
                                :gutter="[10, 0]"
                            >
                                <a-col
                                    :span="24"
                                    class="tw-flex tw-justify-center"
                                >
                                    <a-tag
                                        color="warning"
                                        class="tw-font-medium tw-text-xl tw-rounded-lg tw-px-4 tw-mb-4"
                                    >
                                        EDIT PRODUCT
                                    </a-tag>
                                </a-col>
                                <a-col
                                    :span="24"
                                    class="tw-flex tw-justify-center tw-w-full"
                                >
                                    <a-form-item
                                        label="Name"
                                        class="tw-font-medium tw-w-full"
                                        v-bind="validateInfos.name"
                                    >
                                        <a-input
                                            v-model:value="modelRef.name"
                                            @blur="validate('name')"
                                        />
                                    </a-form-item>
                                </a-col>
                                <a-col
                                    :span="12"
                                    class="tw-flex tw-justify-center"
                                >
                                    <a-form-item
                                        label="Price"
                                        class="tw-font-medium tw-w-full"
                                        v-bind="validateInfos.price"
                                    >
                                        <a-input
                                            type="number"
                                            v-model:value="modelRef.price"
                                            @blur="validate('price')"
                                        />
                                    </a-form-item>
                                </a-col>
                                <a-col
                                    :span="12"
                                    class="tw-flex tw-justify-center"
                                >
                                    <a-form-item
                                        label="Stock"
                                        class="tw-font-medium tw-w-full"
                                        v-bind="validateInfos.stock"
                                    >
                                        <a-input
                                            type="number"
                                            v-model:value="modelRef.stock"
                                            @blur="validate('stock')"
                                        />
                                    </a-form-item>
                                </a-col>
                                <a-col
                                    :span="24"
                                    class="tw-flex tw-justify-center"
                                >
                                    <a-form-item
                                        label="Image file"
                                        class="tw-font-medium tw-w-full"
                                        v-bind="validateInfos.image"
                                    >
                                        <a-upload
                                            v-model="modelRef.image"
                                            :max-count="1"
                                            name="image"
                                            list-type="picture-card"
                                            class="avatar-uploader"
                                            :show-upload-list="true"
                                            :before-upload="
                                                formats.beforeUpload
                                            "
                                            @change="handleUploadChange"
                                            @preview="
                                                productStore.handlePreview
                                            "
                                        >
                                            <img
                                                class="tw-p-1 tw-w-full tw-h-full tw-object-cover tw-rounded-lg"
                                                alt="Upload"
                                                v-if="
                                                    previewImageUrl &&
                                                    modelRef.image
                                                "
                                                :src="previewImageUrl"
                                            />
                                            <div v-else>
                                                <loading-outlined
                                                    v-if="
                                                        productStore.isLoading()
                                                    "
                                                ></loading-outlined>
                                                <plus-outlined
                                                    v-else
                                                ></plus-outlined>
                                                <div class="ant-upload-text">
                                                    Upload
                                                </div>
                                            </div>
                                            <a-modal
                                                :visible="
                                                    productStore.preview.visible
                                                "
                                                :title="
                                                    productStore.preview.title
                                                "
                                                :footer="null"
                                                @cancel="
                                                    productStore.handleCancel
                                                "
                                            >
                                                <img
                                                    alt="example"
                                                    style="width: 100%"
                                                    :src="previewImageUrl!"
                                                />
                                            </a-modal>
                                        </a-upload>
                                        <a-modal :footer="null">
                                            <img
                                                alt="example"
                                                style="width: 100%"
                                            />
                                        </a-modal>
                                    </a-form-item>
                                </a-col>
                                <a-col
                                    :span="24"
                                    class="tw-flex tw-justify-center"
                                >
                                    <a-form-item class="tw-w-full">
                                        <a-row justify="end">
                                            <a-button
                                                @click="$router.push('/stock')"
                                                >Cancel</a-button
                                            >

                                            <a-button
                                                :loading="
                                                    productStore.isLoading()
                                                "
                                                type="primary"
                                                class="tw-ml-2"
                                                @click.prevent="onSubmit"
                                                >Confirm</a-button
                                            >
                                        </a-row>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>
                </a-form>
            </a-card>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import { Form } from "ant-design-vue";
import type { UploadChangeParam } from "ant-design-vue/lib/upload/interface";
import type { TProduct } from "~/types/product.type";

definePageMeta({
    layout: "default",
});
const route = useRoute();

const productStore = useProductStore();

const previewImageUrl = ref(null);

const formats = useFormat();

const useForm = Form.useForm;

const formRule = useFormRule();

const modelRef = reactive({
    name: "",
    price: "",
    stock: "",
    image: null as any,
});

const router = useRouter();

const api = useApi();

const { validate, validateInfos } = useForm(modelRef, formRule.rules);

const handleUploadChange = (info: UploadChangeParam) => {
    // for preview
    const res = productStore.handleChange(info) as any;
    const status = res?.status;
    if (status == "removed") {
        modelRef.image = null;
        previewImageUrl.value = null;
        return;
    }
    previewImageUrl.value = res;

    // for upload
    modelRef.image = formats.convertToFile(info);
};

const onSubmit = async () => {
    validate().then(async () => {
        await productStore.updateProduct(route.params.id as string, {
            name: modelRef.name,
            price: Number(modelRef.price) || 0,
            stock: Number(modelRef.stock) || 0,
            image: modelRef.image,
        });
        router.back();
    });
};

onMounted(async () => {
    const id = route.params.id as string;
    const result = (await api.getProductById(id)) as TProduct;
    modelRef.name = result.name;
    modelRef.price = result.price.toString();
    modelRef.stock = result.stock.toString();
    modelRef.image = result.image;
    previewImageUrl.value = getFullImagePath(result.image) as any;
});
</script>

<style scoped></style>
```
