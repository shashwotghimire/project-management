import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { UserRoleInOrg } from "../types/roles";
export declare class OrganizationsMember extends Model<InferAttributes<OrganizationsMember>, InferCreationAttributes<OrganizationsMember>> {
    id: CreationOptional<string>;
    userId: ForeignKey<string>;
    orgId: ForeignKey<string>;
    userRoleInOrg: UserRoleInOrg;
}
//# sourceMappingURL=organizations-members.model.d.ts.map