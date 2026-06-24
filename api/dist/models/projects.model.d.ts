import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
export declare class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {
    id: CreationOptional<string>;
    name: string;
    organizationId: ForeignKey<string>;
    createdBy: ForeignKey<string>;
    logoUrl: CreationOptional<string>;
    status: CreationOptional<"active" | "archived">;
}
//# sourceMappingURL=projects.model.d.ts.map