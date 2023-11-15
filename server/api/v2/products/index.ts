import product from "@/server/models/product.model";
import { Sequelize } from "sequelize";

export default defineEventHandler(async (event) => {
    const result = await product.findAll({
        order: [["id", "DESC"]],
    });
    return result;
});
