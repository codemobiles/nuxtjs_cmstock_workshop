import { LoginDto } from "~/types/dtos/login.dto";
import bcrypt from "bcryptjs";

const mockData = {
    email: "test@gmail.com",
    password: "$2a$10$m3KhGy5w2zsphZHAR39sg.YUH.nimyX0l4CkqsPCc94B1QrlsBGlS", //Plain: test1234
};

export default defineEventHandler(async (event) => {
    const body = await readBody<LoginDto>(event);
    //* Assume
    if (body.email !== mockData.email) {
        throw createError({
            status: 401,
            message: "Invalid email or password",
        });
    }
    if (!(await bcrypt.compare(body.password, mockData.password))) {
        throw createError({
            status: 401,
            message: "Invalid email or password",
        });
    }

    return body;
});
