"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const ApiError_1 = require("../helpers/ApiError");
const jwt_helper_1 = require("../helpers/jwt.helper");
const users_repository_1 = require("../repositories/users.repository");
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError_1.ApiError(401, "Unauthorized", "Invalid or missing token");
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new ApiError_1.ApiError(401, "Unauthorized", "Invalid or missing token");
        }
        const decoded = (0, jwt_helper_1.verifyAccessToken)(token);
        const user = await (0, users_repository_1.findUserById)(decoded.id);
        if (!user) {
            throw new ApiError_1.ApiError(401, "Unauthorized", "User not found");
        }
        if (!user.emailVerified) {
            throw new ApiError_1.ApiError(401, "Unauthorized", "Email not verified");
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map