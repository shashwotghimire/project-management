import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../configs/db.config";

export class AiSummary extends Model<
  InferAttributes<AiSummary>,
  InferCreationAttributes<AiSummary>
> {
  declare id: CreationOptional<string>;
  declare orgId: ForeignKey<CreationOptional<string>>;
  declare userId: ForeignKey<CreationOptional<string>>;
  declare content: string;
}

AiSummary.init(
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    tableName: "ai_summaries",
    indexes: [{ unique: true, fields: ["user_id", "org_id"] }],
  },
);
