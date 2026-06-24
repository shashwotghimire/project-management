"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.verifyAccessToken = verifyAccessToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("./ApiError");
function generateAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
}
function verifyAccessToken(token) {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new ApiError_1.ApiError(401, "Invalid token", "Unauthorized");
        }
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new ApiError_1.ApiError(401, "Token expired", "Unauthorized");
        }
        throw new ApiError_1.ApiError(500, "Internal server error", "Something went wrong");
    }
}
//# sourceMappingURL=jwt.helper.js.map