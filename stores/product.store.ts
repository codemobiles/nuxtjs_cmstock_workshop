import { FetchingStatus } from "~/types/enums/FetchingStatus";
import type { TProduct } from "~/types/product.type";

export const useProductStore = defineStore("product", () => {
    const products = ref<TProduct[]>([]);
    const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init);
    const api = useApi();

    // getter
    const setLoading = (status: FetchingStatus) => {
        fetchingStatus.value = status;
    };
    const isLoading = () => {
        return fetchingStatus.value === FetchingStatus.fetching;
    };

    const loadProducts = async () => {
        setLoading(FetchingStatus.fetching);
        try {
            const res = await api.getProducts();
            products.value = res;
        } catch (error) {
            products.value = [];
        } finally {
            setLoading(FetchingStatus.success);
        }
    };

    return {
        products,
        loadProducts,
        isLoading,
    };
});
