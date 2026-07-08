import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../configs/db.config";

export type OrgActivityAction =
  | "org_updated"
  | "member_joined"
  | "member_removed"
  | "project_created"
  | "project_deleted"
  | "member_added_to_project"
  | "member_removed_from_project"
  | "invitation_sent"
  | "invitation_accepted";

export class OrgActivityLog extends Model<
  InferAttributes<OrgActivityLog>,
  InferCreationAttributes<OrgActivityLog>
> {
  declare id: CreationOptional<string>;
  declare orgId: ForeignKey<string>;
  declare actorId: ForeignKey<string>;
  declare action: OrgActivityAction;
  declare targetUserId: CreationOptional<string | null>;
  declare projectId: CreationOptional<string | null>;
  declare meta: CreationOptional<object | null>;
  declare createdAt: CreationOptional<Date>;
}

OrgActivityLog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orgId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "organizations", key: "id" },
    },
    actorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    action: {
      type: DataTypes.ENUM(
        "org_updated",
        "member_joined",
        "member_removed",
        "project_created",
        "project_deleted",
        "member_added_to_project",
        "member_removed_from_project",
        "invitation_sent",
        "invitation_accepted"
      ),
      allowNull: false,
    },
    targetUserId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: true,
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
    tableName: "org_activity_logs",
    updatedAt: false,
  }
);
