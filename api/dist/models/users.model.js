"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    githubId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    emailVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    emailVerificationToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM("user", "superadmin"),
        defaultValue: "user",
        allowNull: false,
    },
    gravatarUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: db_config_1.sequelize,
    tableName: "users",
    underscored: true,
    defaultScope: { attributes: { exclude: ["password"] } },
    scopes: {
        withPassword: { attributes: { include: ["password"] } },
    },
});
//# sourceMappingURL=users.model.js.map