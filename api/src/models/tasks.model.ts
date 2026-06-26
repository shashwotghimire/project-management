import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../configs/db.config";
import { TaskPriority, TaskStatus } from "../types/tasks";

export class Tasks extends Model<
  InferAttributes<Tasks>,
  InferCreationAttributes<Tasks>
> {
  declare id: CreationOptional<string>;
  declare title: string;
  declare description: CreationOptional<string>;
  declare createdBy: ForeignKey<string>;
  declare assignedTo: ForeignKey<string>;
  declare assignedBy: ForeignKey<string>;
  declare projectId: ForeignKey<string>;
  declare status: CreationOptional<TaskStatus>;
  declare priority: CreationOptional<TaskPriority>;
  declare position: CreationOptional<number>;
  declare dueDate: CreationOptional<string | null>;
  declare completedAt: CreationOptional<string>;
}

Tasks.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "projects", key: "id" },
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    assignedTo: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    assignedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    status: {
      type: DataTypes.ENUM("todo", "in_progress", "completed"),
      defaultValue: "todo",
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      defaultValue: "medium",
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize, underscored: true, tableName: "tasks" },
);
