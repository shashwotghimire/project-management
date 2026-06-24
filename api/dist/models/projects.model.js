"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
class Project extends sequelize_1.Model {
}
exports.Project = Project;
Project.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    organizationId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "organizations", key: "id" },
    },
    createdBy: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    logoUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "archived"),
        defaultValue: "active",
    },
}, { sequelize: db_config_1.sequelize, underscored: true, tableName: "projects" });
//# sourceMappingURL=projects.model.js.map