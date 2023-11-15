import { LoginDto } from "~/types/dtos/login.dto";
import bcrypt from "bcryptjs";
import user from "~/server/models/user.model";

export default defineEventHandler(async (event) => {
    const body = await readBody<LoginDto>(event);
    const userData = await user.findOne({
        where: {
            username: body.username,
        },
    });
    //* Assume
    if (body.username !== userData?.get("username")) {
        throw createError({
            status: 401,
            message: "Invalid email or password",
        });
    }

    if (
        !(await bcrypt.compare(
            body.password,
            userData?.get("password") as string
        ))
    ) {
        throw createError({
            status: 401,
            message: "Invalid email or password",
        });
    }

    return {
        result: "success",
        data: {
            username: userData?.get("username"),
            level: userData?.get("level"),
            createdAt: userData?.get("createdAt"),
            updatedAt: userData?.get("updatedAt"),
        },
    };
});
