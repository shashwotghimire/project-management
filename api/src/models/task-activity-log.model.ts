import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../configs/db.config";

export type TaskActivityAction =
  | "task_created"
  | "task_assigned"
  | "task_reassigned"
  | "task_unassigned"
  | "status_changed"
  | "priority_changed"
  | "due_date_changed"
  | "title_changed"
  | "description_changed"
  | "comment_added"
  | "comment_edited"
  | "comment_deleted"
  | "task_completed"
  | "task_reopened";

export class TaskActivityLog extends Model<
  InferAttributes<TaskActivityLog>,
  InferCreationAttributes<TaskActivityLog>
> {
  declare id: CreationOptional<string>;
  declare taskId: ForeignKey<string>;
  declare projectId: ForeignKey<string>;
  declare actorId: ForeignKey<string>;
  declare action: TaskActivityAction;
  declare meta: CreationOptional<object | null>;
  declare createdAt: CreationOptional<Date>;
}

TaskActivityLog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    actorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    action: {
      type: DataTypes.ENUM(
        "task_created",
        "task_assigned",
        "task_reassigned",
        "task_unassigned",
        "status_changed",
        "priority_changed",
        "due_date_changed",
        "title_changed",
        "description_changed",
        "comment_added",
        "comment_edited",
        "comment_deleted",
        "task_completed",
        "task_reopened"
      ),
      allowNull: false,
    },
    meta: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    tableName: "task_activity_logs",
    updatedAt: false,
  }
);
