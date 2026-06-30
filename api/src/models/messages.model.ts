import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../configs/db.config";

export class Messages extends Model<
  InferAttributes<Messages>,
  InferCreationAttributes<Messages>
> {
  declare id: CreationOptional<string>;
  declare channelId: ForeignKey<string>;
  declare senderId: ForeignKey<string>;
  declare content: string;
}

Messages.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    channelId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "channels", key: "id" },
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize, underscored: true, tableName: "messages" },
);
