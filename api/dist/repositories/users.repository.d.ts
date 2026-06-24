import { User } from "../models/users.model";
import { UserRoles } from "../types/roles";
export declare const findUserByEmail: (email: string) => Promise<User | null>;
export declare const findUserById: (id: string) => Promise<User | null>;
export declare const createNewUser: (data: {
    username: string;
    email: string;
    password: string;
    role: UserRoles;
    emailVerificationToken?: string;
    gravatarUrl?: string;
}) => Promise<User>;
export declare const findUserByEmailVerificationToken: (token: string) => Promise<User | null>;
export declare const updateUserEmailVerified: (userId: string) => Promise<[affectedCount: number]>;
//# sourceMappingURL=users.repository.d.ts.map