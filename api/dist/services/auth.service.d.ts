export declare const registerService: (data: {
    username: string;
    password: string;
    email: string;
}) => Promise<string>;
export declare const verifyEmailService: (token: string) => Promise<string>;
export declare const loginUserService: (data: {
    email: string;
    password: string;
}) => Promise<{
    user: import("../models/users.model").User;
    accessToken: string;
}>;
export declare const getUserProfileService: (userId: string) => Promise<import("../models/users.model").User>;
//# sourceMappingURL=auth.service.d.ts.map