//Product param id > 3 will be redirected to /demo/product
export default defineNuxtRouteMiddleware((to, from) => {
    if (+to.params.id > 3) {
        return navigateTo("/demo");
    }
});
