import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
export declare class Comments extends Model<InferAttributes<Comments>, InferCreationAttributes<Comments>> {
    id: CreationOptional<string>;
    content: string;
    projectId: ForeignKey<string>;
    organizationId: ForeignKey<string>;
    taskId: ForeignKey<string>;
    authorId: ForeignKey<string>;
}
//# sourceMappingURL=comments.model.d.ts.map