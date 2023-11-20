import { FetchingStatus } from "~/types/enums/FetchingStatus";
import { TSession } from "~/types/session.type";

export const useAuthStore = defineStore("auth", () => {
    const username = useCookie(server.TOKEN_KEY);
    const token = useCookie(server.TOKEN_KEY);
    const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init);
    const session = reactive<TSession>({ isLoggedIn: false });
    const router = useRouter();
});
