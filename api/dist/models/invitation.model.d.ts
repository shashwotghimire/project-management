import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
export declare class Invitations extends Model<InferAttributes<Invitations>, InferCreationAttributes<Invitations>> {
    id: CreationOptional<string>;
    email: string;
    organizationId: string;
    invitedBy: string;
    status: "pending" | "accepted" | "declined";
    token: string;
}
//# sourceMappingURL=invitation.model.d.ts.map