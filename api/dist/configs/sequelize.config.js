"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
module.exports = {
    development: {
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        host: process.env.PGHOST,
        dialect: "postgres",
        dialectOptions: process.env.PGSSLMODE === "require"
            ? { ssl: { require: true, rejectUnauthorized: false } }
            : {},
    },
};
//# sourceMappingURL=sequelize.config.js.map