export default defineEventHandler((event) => {
    const id = getRouterParam(event, "id");
    return {
        message: "get product by id",
        id: id,
    };
});
