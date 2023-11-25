# Nuxt 3 CMS Stock Course EP.92 - Workshop - Frontend - Image Preview

## Outcome

-   [x] Implement `<a-modal>` to preview image

## Documentation for this episode

-   X

## Setup

1. Update `product.store.ts` in `~/stores/product.store.ts`

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

3. Update `create.vue` in `~/pages/stock/create.vue`

```vue
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
        .then(() => {
            console.log(modelRef);
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
