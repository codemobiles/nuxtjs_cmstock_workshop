import type { UploadChangeParam } from "ant-design-vue";

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

    const beforeUpload = (file: File) => {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("You can only upload JPG file!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Image must smaller than 2MB!");
        }
        return isJpgOrPng && isLt2M;
    };

    const convertToFile = (info: UploadChangeParam) => {
        const file = info.file as any;
        const fileConvert = new File([file.originFileObj] as any, file.name, {
            type: file.type,
            lastModified: file.lastModified,
        });
        return fileConvert;
    };

    return {
        beforeUpload,
        toQuantity,
        toCurrency,
        convertToFile,
    };
};
