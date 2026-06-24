import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
export declare class ProjectMembers extends Model<InferAttributes<ProjectMembers>, InferCreationAttributes<ProjectMembers>> {
    id: CreationOptional<string>;
    userId: ForeignKey<string>;
    projectId: ForeignKey<string>;
    assignedBy: ForeignKey<string>;
}
//# sourceMappingURL=project-members.model.d.ts.map