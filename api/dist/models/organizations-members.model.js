"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationsMember = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
class OrganizationsMember extends sequelize_1.Model {
}
exports.OrganizationsMember = OrganizationsMember;
OrganizationsMember.init({
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
    orgId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: { model: "organizations", key: "id" },
    },
    userRoleInOrg: {
        type: sequelize_1.DataTypes.ENUM("member", "org admin"),
        allowNull: false,
    },
}, {
    sequelize: db_config_1.sequelize,
    underscored: true,
    tableName: "organizations_members",
    indexes: [
        {
            unique: true,
            fields: ["user_id", "org_id"],
        },
    ],
});
//# sourceMappingURL=organizations-members.model.js.map