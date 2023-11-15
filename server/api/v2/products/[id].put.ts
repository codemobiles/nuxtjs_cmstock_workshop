import { kResultNok, kResultOk } from "~/server/constants";
import product from "~/server/models/product.model";
import { CreateProductDto } from "~/types/dtos/create-product.dto";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");
    const body = await readBody<CreateProductDto>(event);
    const result = await product.update(body, {
        where: {
            id,
        },
    });
    return {
        result: result[0] ? kResultOk : kResultNok,
    };
});
