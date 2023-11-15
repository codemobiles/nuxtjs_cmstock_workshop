import { Sequelize } from "sequelize";
const dbInstance = new Sequelize({
    dialect: "sqlite",
    storage: "./server/database.sqlite",
    logging: false,
});

(async () => {
    await dbInstance.authenticate();
})();

export default dbInstance;
