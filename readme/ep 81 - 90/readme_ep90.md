# Nuxt 3 CMS Stock Course EP.90 - Workshop - Frontend - Product Card

## Outcome

-   [x] Create `StockCard.vue` component use in `stock.vue` page

## Documentation for this episode

-   X

## Setup

(Optional) Chane `auth-api.service.ts` in `~/services/auth-api.service.ts` to

```ts
import type { TUser } from "~/types/user.type";
import { server, apiUrl } from "~/utils/constants";
import { useFetcher } from "~/composables/useFetcher";
import type { LoginDto } from "~/types/dtos/login.dto";
import type { RegisterDto } from "~/types/dtos/register.dto";
import type { LoginResponse } from "~/types/responses/login.response";

const { fetch } = useFetcher();

export const login = async (loginDto: LoginDto) => {
    const result = (await fetch(`${server.LOGIN_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDto),
    })) as Promise<LoginResponse>;
    return result;
};

export const register = async (registerDto: RegisterDto) => {
    const result = await fetch(server.REGISTER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerDto),
    });
    if (result.result == "ok") {
        return true;
    }
    return false;
};
```

1. Update `create.vue` page

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
                                    >
                                        <a-upload
                                            :max-count="1"
                                            name="image"
                                            list-type="picture-card"
                                            class="avatar-uploader"
                                            :show-upload-list="true"
                                        >
                                            <div slot="trigger">
                                                <!-- <loading-outlined v-if="loading"></loading-outlined>
                        <plus-outlined v-else></plus-outlined> -->
                                                <div class="ant-upload-text">
                                                    Upload
                                                </div>
                                            </div>
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
</script>

<style scoped></style>
```
