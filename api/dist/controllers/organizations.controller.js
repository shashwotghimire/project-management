"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMembersOfOrg = exports.removeOrgMember = exports.getOrgById = exports.deleteOrganization = exports.updateOrganization = exports.getUsersOrganizations = exports.createOrganizaiton = void 0;
const asyncHandler_1 = __importDefault(require("../helpers/asyncHandler"));
const organizations_service_1 = require("../services/organizations.service");
const ApiResponse_1 = require("../helpers/ApiResponse");
const ApiError_1 = require("../helpers/ApiError");
const check_string_helper_1 = require("../helpers/check-string.helper");
exports.createOrganizaiton = (0, asyncHandler_1.default)(async (req, res) => {
    const { name, logoUrl, description, websiteUrl } = req.body;
    const userId = req.user.id;
    const org = await (0, organizations_service_1.createOrganizationService)({
        name,
        adminId: userId,
        logoUrl,
        description,
        websiteUrl,
    });
    return res
        .status(201)
        .json(new ApiResponse_1.ApiResponse(true, "Organization created successfully", org));
});
exports.getUsersOrganizations = (0, asyncHandler_1.default)(async (req, res) => {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const query = req.query.query || "";
    const orgs = await (0, organizations_service_1.getUsersOrganizationsService)({
        userId,
        page,
        limit,
        query,
    });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Organizations fetched successfully", orgs));
});
exports.updateOrganization = (0, asyncHandler_1.default)(async (req, res) => {
    const { orgId } = req.params;
    if (!orgId || typeof orgId !== "string") {
        throw new ApiError_1.ApiError(400, "Organization ID is required", "Organization ID is required");
    }
    const { name, logoUrl, description, websiteUrl } = req.body;
    const userId = req.user.id;
    const updatedOrg = await (0, organizations_service_1.updateOrganizationService)({
        orgId,
        adminId: userId,
        name,
        logoUrl,
        description,
        websiteUrl,
    });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Organization updated successfully", updatedOrg));
});
exports.deleteOrganization = (0, asyncHandler_1.default)(async (req, res) => {
    const { orgId } = req.params;
    const orgID = (0, check_string_helper_1.isString)(orgId);
    const userId = req.user.id;
    await (0, organizations_service_1.deleteOrganizationService)({
        orgId: orgID,
        adminId: userId,
    });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Organization deleted successfully", null));
});
exports.getOrgById = (0, asyncHandler_1.default)(async (req, res) => {
    const orgId = req.params.orgId;
    const orgID = (0, check_string_helper_1.isString)(orgId);
    const org = await (0, organizations_service_1.getOrgByIdService)(orgID, req.user.id);
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Organization fetched successfully", org));
});
exports.removeOrgMember = (0, asyncHandler_1.default)(async (req, res) => {
    const orgId = (0, check_string_helper_1.isString)(req.params.orgId);
    const targetUserId = (0, check_string_helper_1.isString)(req.params.userId);
    const requesterId = req.user.id;
    await (0, organizations_service_1.removeOrgMemberService)({ orgId, targetUserId, requesterId });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Member removed from organization successfully", null));
});
exports.getAllMembersOfOrg = (0, asyncHandler_1.default)(async (req, res) => {
    const orgId = req.params.orgId;
    const orgID = (0, check_string_helper_1.isString)(orgId);
    const members = await (0, organizations_service_1.getAllMembersOfOrgService)(orgID, req.user.id);
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Organization members fetched successfully", members));
});
//# sourceMappingURL=organizations.controller.js.map