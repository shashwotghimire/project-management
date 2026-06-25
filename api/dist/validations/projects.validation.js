"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProjectMemberSchema = exports.addMemberToProjectSchema = exports.getProjectMembersSchema = exports.getProjectByIdSchema = exports.getUserProjectsSchema = exports.updateProjectSchema = exports.deleteProjectSchema = exports.createProjectSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createProjectSchema = zod_1.default.object({
    params: zod_1.default.object({
        orgId: zod_1.default.uuidv4("Invalid organization ID"),
    }),
    body: zod_1.default.object({
        name: zod_1.default.string().min(3, "Project name must be at least 3 characters"),
        logoUrl: zod_1.default.url("Invalid URL format").optional(),
    }),
});
exports.deleteProjectSchema = zod_1.default.object({
    params: zod_1.default.object({
        projectId: zod_1.default.uuidv4("Invalid project ID"),
    }),
});
exports.updateProjectSchema = zod_1.default.object({
    params: zod_1.default.object({
        projectId: zod_1.default.uuidv4("Invalid project ID"),
    }),
    body: zod_1.default.object({
        name: zod_1.default
            .string()
            .min(3, "Project name must be at least 3 characters")
            .optional(),
        logoUrl: zod_1.default.url("Invalid URL format").optional(),
        status: zod_1.default.enum(["active", "archived"]).optional(),
    }),
});
exports.getUserProjectsSchema = zod_1.default.object({
    params: zod_1.default.object({
        orgId: zod_1.default.uuidv4("Invalid organization ID"),
    }),
    query: zod_1.default.object({
        page: zod_1.default.coerce.number().int().min(1).default(1),
        limit: zod_1.default.coerce.number().int().min(1).max(100).default(10),
        search: zod_1.default.string().optional(),
    }),
});
exports.getProjectByIdSchema = zod_1.default.object({
    params: zod_1.default.object({
        projectId: zod_1.default.uuidv4("Invalid project ID"),
    }),
});
exports.getProjectMembersSchema = zod_1.default.object({
    params: zod_1.default.object({
        projectId: zod_1.default.uuidv4("Invalid project ID"),
    }),
});
exports.addMemberToProjectSchema = zod_1.default.object({
    params: zod_1.default.object({
        projectId: zod_1.default.uuidv4("Invalid project ID"),
    }),
    body: zod_1.default.object({
        userId: zod_1.default.uuidv4("Invalid user ID"),
    }),
});
exports.removeProjectMemberSchema = zod_1.default.object({
    params: zod_1.default.object({
        projectId: zod_1.default.uuidv4("Invalid project ID"),
        userId: zod_1.default.uuidv4("Invalid user ID"),
    }),
});
//# sourceMappingURL=projects.validation.js.map