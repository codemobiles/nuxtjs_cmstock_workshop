import product from "~/server/models/product.model";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");
    const result = await product.findByPk(id);
    return result;
});
