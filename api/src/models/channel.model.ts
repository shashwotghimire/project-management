import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../configs/db.config";

export class Channel extends Model<
  InferAttributes<Channel>,
  InferCreationAttributes<Channel>
> {
  declare id: CreationOptional<string>;
  declare projectId: ForeignKey<string>;
  declare name: string;
}

Channel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "projects", key: "id" },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, underscored: true, tableName: "channels" },
);
