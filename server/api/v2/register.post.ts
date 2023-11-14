import { RegisterDto } from "~/types/dtos/register.dto";
import bcrypt from "bcryptjs";
export default defineEventHandler(async (event) => {
    const body = await readBody<RegisterDto>(event);
    body.password = await bcrypt.hash(body.password, 10);
    return body;
});
