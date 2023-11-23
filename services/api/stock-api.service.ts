import { useFetcher } from "~/composables/useFetcher";
import type { CreateProductDto } from "~/types/dtos/create-product.dto";
import { server } from "~/utils/constants";

const { fetch } = useFetcher();

export const getStocks = async () => {
    const result = await fetch(server.PRODUCT_URL);
    return result;
};

export const getStockById = async (id: string) => {
    const result = await fetch(`${server.PRODUCT_URL}/${id}`);
    return result;
};

export const createStock = async (stock: CreateProductDto) => {
    const result = await fetch(server.PRODUCT_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(stock),
    });
    return result;
};

export const updateStock = async (id: string, stock: CreateProductDto) => {
    const result = await fetch(`${server.PRODUCT_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(stock),
    });
    return result;
};

export const deleteStock = async (id: string) => {
    const result = await fetch(`${server.PRODUCT_URL}/${id}`, {
        method: "DELETE",
    });
    return result;
};
