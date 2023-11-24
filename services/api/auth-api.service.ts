import type { TUser } from "~/types/user.type";
import { server, apiUrl } from "~/utils/constants";
import { useFetcher } from "~/composables/useFetcher";
import type { LoginDto } from "~/types/dtos/login.dto";
import type { RegisterDto } from "~/types/dtos/register.dto";
import type { LoginResponse } from "~/types/responses/login.response";

const { fetch } = useFetcher();

export const login = async (loginDto: LoginDto) => {
    const result = (await fetch(`${server.LOGIN_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDto),
    })) as Promise<LoginResponse>;
    return result;
};

export const register = async (registerDto: RegisterDto) => {
    const result = await fetch(server.REGISTER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerDto),
    });
    if (result.result == "ok") {
        return true;
    }
    return false;
};
