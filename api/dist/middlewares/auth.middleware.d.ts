import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
interface TokenPayload extends JwtPayload {
    id: string;
    email: string;
    name: string;
    role: string;
    isEmailVerified: boolean;
}
export interface AuthRequest extends Request {
    user: TokenPayload;
}
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=auth.middleware.d.ts.map