"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
class Comments extends sequelize_1.Model {
}
exports.Comments = Comments;
Comments.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    taskId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "tasks", key: "id" },
    },
    projectId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "projects", key: "id" },
    },
    organizationId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "organizations", key: "id" },
    },
    authorId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
}, { sequelize: db_config_1.sequelize, underscored: true, tableName: "comments" });
//# sourceMappingURL=comments.model.js.map