"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tasks = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
class Tasks extends sequelize_1.Model {
}
exports.Tasks = Tasks;
Tasks.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    projectId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "projects", key: "id" },
    },
    createdBy: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    assignedTo: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    assignedBy: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("todo", "in_progress", "completed"),
        defaultValue: "todo",
    },
    priority: {
        type: sequelize_1.DataTypes.ENUM("low", "medium", "high"),
        defaultValue: "medium",
    },
    position: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    dueDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    completedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, { sequelize: db_config_1.sequelize, underscored: true, tableName: "tasks" });
//# sourceMappingURL=tasks.model.js.map