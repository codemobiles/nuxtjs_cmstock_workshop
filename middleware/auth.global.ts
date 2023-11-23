export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();

    // CHECK AUTH BY LAYOUT
    authStore.restoreSession();

    console.log("authStore.session.isLoggedIn", authStore.session.isLoggedIn);

    if (to.meta.layout === "default") {
        if (authStore.session.isLoggedIn) {
            if (to.path === "/") return await navigateTo("/stock");
            return;
        }
        return await navigateTo("/login");
    }
    if (authStore.session.isLoggedIn) {
        return await navigateTo("/stock");
    }
    return;
});
