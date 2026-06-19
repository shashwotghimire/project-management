import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../configs/db.config";

export class Comments extends Model<
  InferAttributes<Comments>,
  InferCreationAttributes<Comments>
> {
  declare id: CreationOptional<string>;
  declare content: string;
  declare projectId: ForeignKey<string>;
  declare organizationId: ForeignKey<string>;
  declare taskId: ForeignKey<string>;
  declare authorId: ForeignKey<string>;
}

Comments.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    taskId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "tasks", key: "id" },
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "projects", key: "id" },
    },
    organizationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "organizations", key: "id" },
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
  },
  { sequelize, underscored: true, tableName: "comments" },
);
