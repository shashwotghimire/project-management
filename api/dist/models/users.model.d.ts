import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import type { UserRoles } from "../types/roles";
export declare class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    id: CreationOptional<string>;
    username: string;
    email: string;
    password: CreationOptional<string>;
    githubId: CreationOptional<string>;
    emailVerified: CreationOptional<boolean>;
    emailVerificationToken: CreationOptional<string | null>;
    role: UserRoles;
    gravatarUrl: CreationOptional<string>;
}
//# sourceMappingURL=users.model.d.ts.map