import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { userRoleInOrg } from "../types/roles";
import { sequelize } from "../configs/db.config";
export class OrganizationsMember extends Model<
  InferAttributes<OrganizationsMember>,
  InferCreationAttributes<OrganizationsMember>
> {
  declare id: CreationOptional<string>;
  declare userId: ForeignKey<string>;
  declare orgId: ForeignKey<string>;
  declare userRoleInOrg: userRoleInOrg;
}

OrganizationsMember.init(
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
      allowNull: false,
      references: { model: "organizations", key: "id" },
    },
    userRoleInOrg: {
      type: DataTypes.ENUM("member", "org admin"),
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    tableName: "organizations_members",
    indexes: [
      {
        unique: true,
        fields: ["user_id", "org_id"],
      },
    ],
  },
);
