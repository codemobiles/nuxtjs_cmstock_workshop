import type { LoginDto } from "~/types/dtos/login.dto";
import type { RegisterDto } from "~/types/dtos/register.dto";
import { FetchingStatus } from "~/types/enums/FetchingStatus";
import { TSession } from "~/types/session.type";

export const useAuthStore = defineStore("auth", () => {
    const username = useCookie(server.TOKEN_KEY);
    const token = useCookie(server.TOKEN_KEY);
    const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init);
    const session = reactive<TSession>({ isLoggedIn: false });
    const router = useRouter();
    const api = useApi();

    const login = async (loginDto: LoginDto) => {
        try {
            fetchingStatus.value = FetchingStatus.fetching;
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const { result, data } = await api.login(loginDto);
            if (result === "ok") {
                session.username = data.username;
                session.isLoggedIn = true;
                fetchingStatus.value = FetchingStatus.success;
                message.success("Login successful");
                console.log("ล็อคอินสำเร็จ");
            } else {
                session.isLoggedIn = false;
                fetchingStatus.value = FetchingStatus.failed;
                message.error("Login Failed");
            }
            window.open("/stock", "_self");
        } catch (e) {
            console.log(e);

            session.isLoggedIn = false;
            fetchingStatus.value = FetchingStatus.failed;
            message.error("Something went wrong");
        }
    };

    const register = async (registerDto: RegisterDto) => {
        try {
            fetchingStatus.value = FetchingStatus.fetching;
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const result = await api.register(registerDto);
            if (result == true) {
                fetchingStatus.value = FetchingStatus.success;
                message.success("Register successful");
                return await navigateTo("/login", { redirectCode: 301 });
            } else {
                fetchingStatus.value = FetchingStatus.failed;
                message.error("Register Failed");
            }
        } catch (e) {
            fetchingStatus.value = FetchingStatus.failed;
            message.error("Something went wrong");
        }
    };
    return {
        login,
        register,
    };
});