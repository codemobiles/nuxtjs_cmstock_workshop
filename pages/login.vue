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
                    >Login</span
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
                    class="tw-w-full tw-mb-2 tw-bg-[#00B98D] tw-text-white tw-ring-[#00B98D]"
                    html-type="submit"
                    @click.prevent="onSubmit"
                    :loading="authStore.isLoading()"
                    >Login</a-button
                > -->
                <a-button
                    size="large"
                    shape="round"
                    class="tw-w-full tw-mb-2 tw-bg-[#00B98D] tw-text-white tw-ring-[#00B98D]"
                    html-type="submit"
                    @click.prevent="onSubmit"
                    >Login</a-button
                >

                <a-button
                    size="large"
                    class="tw-w-full tw-mb-2"
                    shape="round"
                    @click="resetFields"
                    >Reset</a-button
                >

                <a-button
                    size="large"
                    shape="round"
                    type="link"
                    class="tw-w-full tw-mb-2 tw-text-[#00B98D]"
                    @click="$router.push('/register')"
                    >haven't account yet? please register</a-button
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
            // await authStore.login(toRaw(modelRef));
        })
        .catch((err) => {
            console.log("error", err);
        });
};

onMounted(() => {
    modelRef.username = "admin";
    modelRef.password = "1234";
});
</script>

<style scoped></style>
