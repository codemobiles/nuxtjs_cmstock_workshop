# Nuxt 3 CMS Stock Course EP.71 - Workshop - Frontend - Use API Composable (Register)

## Outcome

-   [x] Use API Composable
-   [x] Update api register in `useApi`

## Documentation for this episode

-   X

## Setup

1. Update `register.vue` in `~/pages/register.vue`

```vue
// ~/pages/register.vue

<template>
    <a-card hoverable type="inner" class="tw-rounded-lg tw-w-[500px]">
        <template #cover>
            <img
                alt="example"
                src="~/assets/images/banner_display.jpg"
                class="tw-object-cover tw-object-center tw-rounded-lg"
            />
        </template>
        <a-card-meta class="tw-mb-4">
            <template #title>
                <span class="tw-font-bold tw-text-2xl tw-tracking-wider"
                    >Register</span
                >
                <a-divider class="tw-my-4"></a-divider>
            </template>
        </a-card-meta>
        <a-form
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            class="tw-w-[420px]"
        >
            <a-form-item v-bind="validateInfos.username">
                <a-input
                    v-model:value="modelRef.username"
                    placeholder="Username"
                    size="large"
                >
                    <template #prefix>
                        <UserOutlined class="tw-opacity-50"></UserOutlined>
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item v-bind="validateInfos.password">
                <a-input-password
                    size="large"
                    v-model:value="modelRef.password"
                    placeholder="Password"
                >
                    <template #prefix>
                        <LockOutlined class="tw-opacity-50"></LockOutlined>
                    </template>
                </a-input-password>
            </a-form-item>

            <a-form-item>
                <!-- <a-button
                    size="large"
                    shape="round"
                    class="tw-w-full tw-mb-5 tw-bg-[#00B98D] tw-text-white"
                    type="primary"
                    html-type="submit"
                    @click.prevent="onSubmit"
                    :loading="authStore.isLoading()"
                    >Register</a-button
                > -->
                <a-button
                    size="large"
                    shape="round"
                    class="tw-w-full tw-mb-5 tw-bg-[#00B98D] tw-text-white"
                    type="primary"
                    html-type="submit"
                    @click.prevent="onSubmit"
                    >Register</a-button
                >
                <a-button
                    size="large"
                    shape="round"
                    class="tw-w-full tw-mb-2"
                    @click="$router.push('/login')"
                    >Back to Login</a-button
                >
            </a-form-item>
        </a-form>
    </a-card>
</template>

<script setup lang="ts">
import { Form } from "ant-design-vue";

definePageMeta({
    layout: "authen",
});

const api = useApi();

const labelCol = { span: 0 };
const wrapperCol = { span: 24 };

const useForm = Form.useForm;
// const authStore = useAuth();
const modelRef = reactive({
    username: "",
    password: "",
});
const rulesRef = reactive({
    username: [
        {
            required: true,
            message: "Please input username",
        },
    ],
    password: [
        {
            required: true,
            message: "Please input password",
        },
    ],
});
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
    onValidate: (...args) => console.log(...args),
});
const onSubmit = () => {
    validate()
        .then(async () => {
            api.register({
                username: modelRef.username,
                password: modelRef.password,
            });
            // await authStore.register(toRaw(modelRef));
        })
        .catch((err) => {
            console.log("error", err);
        });
};
</script>

<style scoped></style>
```
