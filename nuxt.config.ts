// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ["~/assets/css/mycss.css"],
    modules: ["dayjs-nuxt"],
    runtimeConfig: {
        secretEnv: process.env.SECRET_ENV,
        public: {
            publicEnv: process.env.PUBLIC_ENV,
        },
    },
});
