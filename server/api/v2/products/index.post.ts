import product from "@/server/models/product.model";
import { CreateProductDto } from "~/types/dtos/create-product.dto";

export default defineEventHandler(async (event) => {
    const body = await readBody<CreateProductDto>(event);
    const result = await product.create(body);
    return result;
});
