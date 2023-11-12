export default defineEventHandler((event) => {
    const id = getRouterParam(event, "id");
    return {
        message: "put products",
        id: id,
    };
});
