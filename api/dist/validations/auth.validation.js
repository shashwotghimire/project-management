"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.verifyEmailSchema = exports.registerUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerUserSchema = zod_1.default.object({
    body: zod_1.default.object({
        username: zod_1.default.string().trim().min(2, "Name must be at least 2 characters"),
        email: zod_1.default.email("Invalid email address").trim().toLowerCase(),
        password: zod_1.default.string().min(6, "Password must be at least 6 characters"),
    }),
});
exports.verifyEmailSchema = zod_1.default.object({
    query: zod_1.default.object({
        token: zod_1.default.string(),
    }),
});
exports.loginUserSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default.email("Invalid email address").trim().toLowerCase(),
        password: zod_1.default.string().min(6, "Password must be at least 6 characters"),
    }),
});
//# sourceMappingURL=auth.validation.js.map