import dayjs from "dayjs";

const startAt = dayjs().format();
let pageview = 0;

export default defineEventHandler((event) => {
    return {
        startAt,
        pageview: ++pageview,
    };
});
