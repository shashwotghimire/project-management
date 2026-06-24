"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectMembers = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
class ProjectMembers extends sequelize_1.Model {
}
exports.ProjectMembers = ProjectMembers;
ProjectMembers.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
    projectId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "projects", key: "id" },
    },
    assignedBy: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "users", key: "id" },
    },
}, {
    sequelize: db_config_1.sequelize,
    underscored: true,
    tableName: "project_members",
    indexes: [
        {
            unique: true,
            fields: ["user_id", "project_id"],
        },
    ],
});
//# sourceMappingURL=project-members.model.js.map