import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../configs/db.config";
export class Organization extends Model<
  InferAttributes<Organization>,
  InferCreationAttributes<Organization>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare adminId: ForeignKey<string>;
  declare blocked: CreationOptional<boolean>;
  declare logoUrl: CreationOptional<string>;
  declare description: CreationOptional<string>;
  declare websiteUrl: CreationOptional<string>;
}

Organization.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adminId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    logoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    websiteUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize, underscored: true, tableName: "organizations" },
);
