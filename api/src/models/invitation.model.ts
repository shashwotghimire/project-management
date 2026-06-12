import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../configs/db.config";

export class Invitations extends Model<
  InferAttributes<Invitations>,
  InferCreationAttributes<Invitations>
> {
  declare id: CreationOptional<string>;
  declare email: string;
  declare organizationId: string;
  declare invitedBy: string;
  declare status: "pending" | "accepted" | "declined";
  declare token: string;
}

Invitations.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organizationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    invitedBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "declined"),
      allowNull: false,
      defaultValue: "pending",
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "invitations",
    underscored: true,
  },
);
