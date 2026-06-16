import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../configs/db.config";

export class ProjectMembers extends Model<
  InferAttributes<ProjectMembers>,
  InferCreationAttributes<ProjectMembers>
> {
  declare id: CreationOptional<string>;
  declare userId: ForeignKey<string>;
  declare projectId: ForeignKey<string>;
  declare assignedBy: ForeignKey<string>;
}

ProjectMembers.init(
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
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "projects", key: "id" },
    },
    assignedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    tableName: "project_members",
    indexes: [
      {
        unique: true,
        fields: ["user_id", "project_id"],
      },
    ],
  },
);
