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
                                    >
                                        <a-input />
                                    </a-form-item>
                                </a-col>
                                <a-col
                                    :span="12"
                                    class="tw-flex tw-justify-center"
                                >
                                    <a-form-item
                                        label="Price"
                                        class="tw-font-medium tw-w-full"
                                    >
                                        <a-input type="number" />
                                    </a-form-item>
                                </a-col>
                                <a-col
                                    :span="12"
                                    class="tw-flex tw-justify-center"
                                >
                                    <a-form-item
                                        label="Price"
                                        class="tw-font-medium tw-w-full"
                                    >
                                        <a-input type="number" />
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
                                            <a-button class="tw-ml-2"
                                                >Reset</a-button
                                            >
                                            <a-button
                                                type="primary"
                                                class="tw-ml-2"
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
definePageMeta({
    layout: "default",
});
</script>

<style scoped></style>
