"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invitations = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
class Invitations extends sequelize_1.Model {
}
exports.Invitations = Invitations;
Invitations.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    organizationId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    invitedBy: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("pending", "accepted", "declined"),
        allowNull: false,
        defaultValue: "pending",
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: db_config_1.sequelize,
    tableName: "invitations",
    underscored: true,
});
//# sourceMappingURL=invitation.model.js.map