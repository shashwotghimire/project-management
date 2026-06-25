"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMembersOfOrg = exports.removeOrgMember = exports.userMemberOfOrg = exports.deleteOrganization = exports.updateOrganization = exports.getOrgByAdminId = exports.getOrgById = exports.joinAnOrganization = exports.getUsersOrganizations = exports.createOrganization = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
const organizations_members_model_1 = require("../models/organizations-members.model");
const organizations_model_1 = require("../models/organizations.model");
const users_model_1 = require("../models/users.model");
const createOrganization = ({ name, adminId, logoUrl, description, websiteUrl, }) => {
    return db_config_1.sequelize.transaction(async (t) => {
        const org = await organizations_model_1.Organization.create({
            name,
            adminId,
            logoUrl,
            description,
            websiteUrl,
        }, { transaction: t });
        const admin = await organizations_members_model_1.OrganizationsMember.create({
            userId: adminId,
            orgId: org.id,
            userRoleInOrg: "org admin",
        }, {
            transaction: t,
        });
        return { org, admin };
    });
};
exports.createOrganization = createOrganization;
const getUsersOrganizations = async ({ userId, page, limit, query, }) => {
    let whereClause = {};
    if (query) {
        whereClause[sequelize_1.Op.or] = [{ username: { [sequelize_1.Op.iLike]: `%${query}%` } }];
    }
    const userOrgs = await organizations_members_model_1.OrganizationsMember.findAll({
        where: { userId },
        include: [
            {
                model: organizations_model_1.Organization,
                where: whereClause,
            },
            {
                model: users_model_1.User,
                attributes: ["username", "email"],
            },
        ],
        attributes: {
            exclude: ["id", "createdAt", "updatedAt", "orgId"],
        },
        limit,
        offset: (page - 1) * limit,
    });
    const total = await organizations_members_model_1.OrganizationsMember.count({
        where: { userId },
        include: {
            model: organizations_model_1.Organization,
            where: whereClause,
        },
    });
    return {
        organizations: userOrgs,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
        },
    };
};
exports.getUsersOrganizations = getUsersOrganizations;
const joinAnOrganization = ({ userId, orgId, }) => {
    return organizations_members_model_1.OrganizationsMember.create({
        userId,
        orgId,
        userRoleInOrg: "member",
    });
};
exports.joinAnOrganization = joinAnOrganization;
const getOrgById = (orgId) => {
    return organizations_model_1.Organization.findByPk(orgId);
};
exports.getOrgById = getOrgById;
const getOrgByAdminId = (adminId, orgId) => {
    return organizations_model_1.Organization.findOne({ where: { id: orgId, adminId } });
};
exports.getOrgByAdminId = getOrgByAdminId;
const updateOrganization = async ({ orgId, name, logoUrl, description, websiteUrl, userId, }) => {
    const org = await (0, exports.getOrgByAdminId)(userId, orgId);
    if (!org)
        return null;
    if (name)
        org.name = name;
    if (logoUrl !== undefined)
        org.logoUrl = logoUrl;
    if (description !== undefined)
        org.description = description;
    if (websiteUrl !== undefined)
        org.websiteUrl = websiteUrl;
    await org.save();
    return org;
};
exports.updateOrganization = updateOrganization;
const deleteOrganization = async (orgId, userId) => {
    const org = await (0, exports.getOrgByAdminId)(userId, orgId);
    if (!org) {
        return null;
    }
    await org.destroy();
    return true;
};
exports.deleteOrganization = deleteOrganization;
const userMemberOfOrg = async (userId, orgId) => {
    const membership = await organizations_members_model_1.OrganizationsMember.findOne({
        where: { userId, orgId },
    });
    return !!membership;
};
exports.userMemberOfOrg = userMemberOfOrg;
const removeOrgMember = async (userId, orgId) => {
    return organizations_members_model_1.OrganizationsMember.destroy({ where: { userId, orgId } });
};
exports.removeOrgMember = removeOrgMember;
const getAllMembersOfOrg = async (orgId) => {
    return organizations_members_model_1.OrganizationsMember.findAll({
        where: { orgId },
        include: [
            {
                model: users_model_1.User,
                attributes: ["id", "username", "email", "gravatarUrl"],
            },
        ],
        attributes: {
            exclude: ["id", "updatedAt", "userId", "orgId"],
        },
    });
};
exports.getAllMembersOfOrg = getAllMembersOfOrg;
//# sourceMappingURL=organizations.repository.js.map