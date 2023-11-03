export default defineEventHandler((event) => {
    const config = useRuntimeConfig(event);
    console.log("config", config.secretEnv);
    return {};
});
