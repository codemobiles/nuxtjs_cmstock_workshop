import { login, register } from "@/services/api/auth-api.service";
export const useApi = () => {
    return {
        login,
        register,
    };
};
