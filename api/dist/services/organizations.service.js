"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMembersOfOrgService = exports.getOrgByIdService = exports.deleteOrganizationService = exports.updateOrganizationService = exports.getUsersOrganizationsService = exports.createOrganizationService = void 0;
const ApiError_1 = require("../helpers/ApiError");
const organizations_repository_1 = require("../repositories/organizations.repository");
const createOrganizationService = async ({ name, adminId, logoUrl = "", description = "", websiteUrl = "", }) => {
    return await (0, organizations_repository_1.createOrganization)({
        name,
        adminId,
        logoUrl,
        description,
        websiteUrl,
    });
};
exports.createOrganizationService = createOrganizationService;
const getUsersOrganizationsService = async ({ userId, page = 1, limit = 10, query = "", }) => {
    return await (0, organizations_repository_1.getUsersOrganizations)({ userId, page, limit, query });
};
exports.getUsersOrganizationsService = getUsersOrganizationsService;
const updateOrganizationService = async ({ orgId, adminId, name, logoUrl, description, websiteUrl, }) => {
    const org = await (0, organizations_repository_1.getOrgByAdminId)(adminId, orgId);
    if (!org) {
        throw new ApiError_1.ApiError(404, "Organization not found or you are not the admin", "Organization not found or you are not the admin");
    }
    const updatedOrg = await (0, organizations_repository_1.updateOrganization)({
        orgId,
        userId: adminId,
        name,
        logoUrl,
        description,
        websiteUrl,
    });
    return updatedOrg;
};
exports.updateOrganizationService = updateOrganizationService;
const deleteOrganizationService = async ({ orgId, adminId, }) => {
    const org = await (0, organizations_repository_1.getOrgByAdminId)(adminId, orgId);
    if (!org) {
        throw new ApiError_1.ApiError(404, "Organization not found or you are not the admin", "Organization not found or you are not the admin");
    }
    await (0, organizations_repository_1.deleteOrganization)(orgId, adminId);
};
exports.deleteOrganizationService = deleteOrganizationService;
const getOrgByIdService = async (orgId, userId) => {
    const isMember = await (0, organizations_repository_1.userMemberOfOrg)(userId, orgId);
    if (!isMember) {
        throw new ApiError_1.ApiError(403, "You do not have access to this organization", "You do not have access to this organization");
    }
    const org = await (0, organizations_repository_1.getOrgById)(orgId);
    if (!org) {
        throw new ApiError_1.ApiError(404, "Organization not found", "Organization not found");
    }
    return org;
};
exports.getOrgByIdService = getOrgByIdService;
const getAllMembersOfOrgService = async (orgId, userId) => {
    const isMember = await (0, organizations_repository_1.userMemberOfOrg)(userId, orgId);
    if (!isMember) {
        throw new ApiError_1.ApiError(403, "You do not have access to this organization", "You do not have access to this organization");
    }
    const org = await (0, organizations_repository_1.getOrgById)(orgId);
    if (!org) {
        throw new ApiError_1.ApiError(404, "Organization not found", "Organization not found");
    }
    return await (0, organizations_repository_1.getAllMembersOfOrg)(orgId);
};
exports.getAllMembersOfOrgService = getAllMembersOfOrgService;
//# sourceMappingURL=organizations.service.js.map