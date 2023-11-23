import { login, register } from "@/services/api/auth-api.service";
import {
    getProducts,
    createProduct,
    deleteProduct,
    getProductById,
    updateProduct,
} from "@/services/api/product-api.service";
export const useApi = () => {
    return {
        login,
        register,
        getProducts,
        createProduct,
        deleteProduct,
        getProductById,
        updateProduct,
    };
};
