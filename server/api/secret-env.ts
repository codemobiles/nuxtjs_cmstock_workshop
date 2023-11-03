export default defineEventHandler((event) => {
    const config = useRuntimeConfig(event);
    return {
        secretEnv: config.secretEnv,
    };
});
