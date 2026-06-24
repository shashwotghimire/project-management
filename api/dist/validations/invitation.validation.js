"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.respondToInvitationSchema = exports.createInvitationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createInvitationSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default.email("Invalid email address").trim().toLowerCase(),
        organizationId: zod_1.default.uuid("Invalid organization ID"),
    }),
});
exports.respondToInvitationSchema = zod_1.default.object({
    query: zod_1.default.object({
        token: zod_1.default.string().trim(),
    }),
    body: zod_1.default.object({
        response: zod_1.default.enum(["accepted", "declined"]),
    }),
});
//# sourceMappingURL=invitation.validation.js.map