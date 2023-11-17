import product from "@/server/models/product.model";
import { kResultNok, kResultOk } from "~/server/constants";
import { uploadImage } from "~/server/services/upload-file.service";
import { CreateProductDto } from "~/types/dtos/create-product.dto";

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event);
    const file = formData?.find((item) => item.name === "file");
    const bodyRaw = formData?.find((item) => item.name === "body");

    if (!bodyRaw) return { result: kResultNok, data: "body is required" };

    const body = bodyRaw ? JSON.parse(bodyRaw?.data.toString()) : null;

    if (!body) return { result: kResultNok, data: "body is required" };

    const result = await product.create(body);
    if (file?.filename) {
        uploadImage(file, result);
    }
    return {
        result: result ? kResultOk : kResultNok,
        data: result,
    };
});
