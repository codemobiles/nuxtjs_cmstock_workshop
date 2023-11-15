import product from "~/server/models/product.model";

export default defineEventHandler((event) => {
    const id = getRouterParam(event, "id");
    return product.destroy({ where: { id } });
});
