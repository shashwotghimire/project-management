import jwt from "jsonwebtoken";
import { UserRoles } from "../types/roles";
interface JwtPayload {
    id: string;
    email: string;
    name: string;
    role: UserRoles;
    isEmailVerified: boolean;
}
export declare function generateAccessToken(payload: JwtPayload): string;
export declare function verifyAccessToken(token: string): string | jwt.JwtPayload;
export {};
//# sourceMappingURL=jwt.helper.d.ts.map