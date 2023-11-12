export default defineEventHandler((event) => {
    const id = getRouterParam(event, "id");
    return {
        message: "delete products",
        id: id,
    };
});
