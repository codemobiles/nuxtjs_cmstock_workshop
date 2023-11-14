import { LoginDto } from "~/types/dtos/login.dto";

export default defineEventHandler(async (event) => {
    const body = await readBody<LoginDto>(event);
    return body;
});
