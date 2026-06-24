"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
class Organization extends sequelize_1.Model {
}
exports.Organization = Organization;
Organization.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    adminId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    blocked: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    logoUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    websiteUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, { sequelize: db_config_1.sequelize, underscored: true, tableName: "organizations" });
//# sourceMappingURL=organizations.model.js.map