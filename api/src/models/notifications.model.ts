import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../configs/db.config";

export class Notifications extends Model<
  InferAttributes<Notifications>,
  InferCreationAttributes<Notifications>
> {
  declare id: CreationOptional<string>;
  declare userId: ForeignKey<string>;
  declare orgId: CreationOptional<string | null>;
  declare projectId: CreationOptional<string | null>;
  declare title: string;
  declare message: string;
  declare isRead: CreationOptional<boolean>;
}

Notifications.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    orgId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, underscored: true, tableName: "notifications" },
);
