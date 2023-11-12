export default defineEventHandler((event) => {
    const keyword = getRouterParam(event, "keyword") || "";
    const keyWordDecoded = decodeURIComponent(keyword);
    return {
        message: "Search product",
        keyword: keyWordDecoded,
    };
});
