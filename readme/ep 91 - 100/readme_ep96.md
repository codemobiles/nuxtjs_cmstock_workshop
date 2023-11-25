# Nuxt 3 CMS Stock Course EP.96 - Workshop - Frontend - Edit Product (Part 3) Fetch Product Data

## Outcome

-   [x] Fetch `product` by `id` in `~/pages/stock/edit/[id].vue`

## Documentation for this episode

-   X

## Setup

1. Update `[id].vue` in `~/pages/stock/edit/[id].vue` by implement logic

```vue
<!-- ~/pages/stock/edit/[id].vue -->

<
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
        console.log(modelRef);
    });
};
</script>

<style scoped></style>
```
