import { useFetcher } from "~/composables/useFetcher";
import type { CreateProductDto } from "~/types/dtos/create-product.dto";
import type { TProduct } from "~/types/product.type";
import { server } from "~/utils/constants";

const { fetch } = useFetcher();

export const getProducts = async (): Promise<TProduct[]> => {
    const result = await fetch(server.PRODUCT_URL);
    return result;
};

export const getProductById = async (id: string) => {
    const result = await fetch(`${server.PRODUCT_URL}/${id}`);
    return result;
};

export const createProduct = async (Product: CreateProductDto) => {
    const result = await fetch(server.PRODUCT_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Product),
    });
    return result;
};

export const updateProduct = async (id: string, Product: CreateProductDto) => {
    const result = await fetch(`${server.PRODUCT_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(Product),
    });
    return result;
};

export const deleteProduct = async (id: string) => {
    const result = await fetch(`${server.PRODUCT_URL}/${id}`, {
        method: "DELETE",
    });
    return result;
};

export const getProductByKeyword = async (keyword: string) => {
    const result = await fetch(`${server.PRODUCT_URL}/name/${keyword}`);
    return result;
};
