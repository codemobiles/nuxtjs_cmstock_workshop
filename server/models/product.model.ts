import * as Sequelize from "sequelize";
import dbInstance from "../db_instance";

const product = dbInstance.define(
    "products",
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "-",
        },
        price: {
            type: Sequelize.NUMBER,
            // allowNull defaults to true
        },
        stock: {
            type: Sequelize.NUMBER,
            // allowNull defaults to true
        },
    },
    {
        // options
    }
);

(async () => {
    await product.sync({ force: false });
})();

export default product;
