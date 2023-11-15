import { RegisterDto } from "~/types/dtos/register.dto";
import bcrypt from "bcryptjs";
import user from "~/server/models/user.model";
import { kResultOk } from "~/server/constants";
export default defineEventHandler(async (event) => {
    const body = await readBody<RegisterDto>(event);
    body.password = await bcrypt.hash(body.password, 10);
    const userData = await user.findOne({ where: { username: body.username } });
    if (userData) {
        throw createError({
            status: 409,
            message: "Username already exists",
        });
    }
    const result = await user.create(body);
    return {
        result: kResultOk,
        data: {
            username: result.get("username"),
            level: result.get("level"),
            createdAt: result.get("createdAt"),
            updatedAt: result.get("updatedAt"),
        },
    };
});
