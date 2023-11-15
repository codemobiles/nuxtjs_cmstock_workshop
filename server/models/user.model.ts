import * as Sequelize from "sequelize";
import dbInstance from "../db_instance";

const user = dbInstance.define(
    "users",
    {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        level: {
            type: Sequelize.STRING,
            defaultValue: "normal",
        },
    },
    {}
);

(async () => {
    await user.sync({ force: false });
})();

export default user;
