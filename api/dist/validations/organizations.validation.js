"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeOrgMemberSchema = exports.getAllMembersOfOrgSchema = exports.getOrgByIdSchema = exports.deleteOrganizationSchema = exports.updateOrganizationSchema = exports.getUsersOrganizationsSchema = exports.createOrganizationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createOrganizationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().min(3, "Organization name must be at least 3 characters"),
    }),
});
exports.getUsersOrganizationsSchema = zod_1.default.object({
    query: zod_1.default.object({
        page: zod_1.default
            .string()
            .optional()
            .transform((val) => (val ? parseInt(val) : 1))
            .refine((val) => val > 0, "Page must be a positive integer"),
        limit: zod_1.default
            .string()
            .optional()
            .transform((val) => (val ? parseInt(val) : 10))
            .refine((val) => val > 0, "Limit must be a positive integer"),
        query: zod_1.default.string().optional(),
    }),
});
exports.updateOrganizationSchema = zod_1.default.object({
    params: zod_1.default.object({
        orgId: zod_1.default.uuidv4("Invalid organization ID "),
    }),
    body: zod_1.default.object({
        name: zod_1.default
            .string()
            .min(3, "Organization name must be at least 3 characters")
            .optional(),
        logoUrl: zod_1.default.url("Invalid URL format").optional(),
        description: zod_1.default.string().optional(),
        websiteUrl: zod_1.default.url("Invalid URL format").optional(),
    }),
});
exports.deleteOrganizationSchema = zod_1.default.object({
    params: zod_1.default.object({
        orgId: zod_1.default.uuidv4("Invalid organization ID"),
    }),
});
exports.getOrgByIdSchema = zod_1.default.object({
    params: zod_1.default.object({
        orgId: zod_1.default.uuidv4("Invalid organization ID"),
    }),
});
exports.getAllMembersOfOrgSchema = zod_1.default.object({
    params: zod_1.default.object({
        orgId: zod_1.default.uuidv4("Invalid organization ID"),
    }),
});
exports.removeOrgMemberSchema = zod_1.default.object({
    params: zod_1.default.object({
        orgId: zod_1.default.uuidv4("Invalid organization ID"),
        userId: zod_1.default.uuidv4("Invalid user ID"),
    }),
});
//# sourceMappingURL=organizations.validation.js.map