import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
export declare class Organization extends Model<InferAttributes<Organization>, InferCreationAttributes<Organization>> {
    id: CreationOptional<string>;
    name: string;
    adminId: ForeignKey<string>;
    blocked: CreationOptional<boolean>;
    logoUrl: CreationOptional<string>;
    description: CreationOptional<string>;
    websiteUrl: CreationOptional<string>;
}
//# sourceMappingURL=organizations.model.d.ts.map