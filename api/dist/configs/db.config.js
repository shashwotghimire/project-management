"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
exports.connectDb = connectDb;
const sequelize_1 = require("sequelize");
require("dotenv/config");
exports.sequelize = new sequelize_1.Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: process.env.PGHOST,
    dialect: "postgres",
    ssl: process.env.PGSSLMODE === "require",
});
async function connectDb() {
    try {
        await exports.sequelize.authenticate();
        console.log("Connection has been established successfully.");
        await import("../models/associations.js");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
//# sourceMappingURL=db.config.js.map