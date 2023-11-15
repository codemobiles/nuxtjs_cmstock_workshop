import { kResultNok, kResultOk } from "~/server/constants";
import product from "~/server/models/product.model";

export default defineEventHandler((event) => {
    const id = getRouterParam(event, "id");
    const result = product.destroy({ where: { id } });
    if (!result) {
        return {
            result: kResultNok,
        };
    }
    return {
        result: kResultOk,
        data: {
            id,
        },
    };
});
