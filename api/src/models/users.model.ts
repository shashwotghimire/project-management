import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../configs/db.config";
import type { userRoles } from "../types/roles";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<string>;
  declare username: string;
  declare email: string;
  declare password: CreationOptional<string>;
  declare githubId: CreationOptional<string>;
  declare emailVerified: CreationOptional<boolean>;
  declare role: userRoles;
  declare gravatarUrl: CreationOptional<string>;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    githubId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM("user", "superadmin"),
      defaultValue: "user",
      allowNull: false,
    },
    gravatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, tableName: "users", underscored: true },
);
