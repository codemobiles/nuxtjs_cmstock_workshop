import product from "@/server/models/product.model";

export default defineEventHandler(async (event) => {
    const result = await product.findAll({
        order: [["price", "DESC"]],
        limit: 5,
    });
    return result;
});
