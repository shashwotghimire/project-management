"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInvitationStatusService = exports.createInvitationService = void 0;
const ApiError_1 = require("../helpers/ApiError");
const invitation_repository_1 = require("../repositories/invitation.repository");
const organizations_repository_1 = require("../repositories/organizations.repository");
const crypto_utils_1 = require("../utils/crypto.utils");
const email_service_1 = require("./email.service");
const email_template_utils_1 = require("../utils/email-template.utils");
const users_repository_1 = require("../repositories/users.repository");
const createInvitationService = async ({ email, organizationId, invitedBy, }) => {
    const org = await (0, organizations_repository_1.getOrgById)(organizationId);
    if (!org) {
        throw new ApiError_1.ApiError(404, "Organization not found", "Organization not found");
    }
    const user = await (0, users_repository_1.findUserById)(invitedBy);
    if (!user) {
        throw new ApiError_1.ApiError(404, "User not found", "User not found");
    }
    const isSenderAdmin = await (0, organizations_repository_1.getOrgByAdminId)(invitedBy, organizationId);
    if (!isSenderAdmin) {
        throw new ApiError_1.ApiError(403, "You do not have permission to send invitations.", "Forbidden");
    }
    const existingInvitation = await (0, invitation_repository_1.existingPendingInvitation)({
        email,
        organizationId,
    });
    if (existingInvitation) {
        throw new ApiError_1.ApiError(400, "Invitation already sent.", "Invitation already sent to this user");
    }
    const invitationToken = (0, crypto_utils_1.createInvitationToken)();
    (0, email_service_1.sendEmail)(email, `You're invited to join ${org.name}`, (0, email_template_utils_1.invitationEmailTemplate)(org.name, user.username, invitationToken));
    return await (0, invitation_repository_1.createInvitation)({
        email,
        organizationId,
        invitedBy,
        token: invitationToken,
    });
};
exports.createInvitationService = createInvitationService;
const updateInvitationStatusService = async ({ token, status, }) => {
    const invitation = await (0, invitation_repository_1.getInvitationByToken)(token);
    if (!invitation) {
        throw new ApiError_1.ApiError(404, "Invitation not found", "Invitation not found");
    }
    if (invitation.status !== "pending") {
        throw new ApiError_1.ApiError(400, "Invitation already responded to.", "This invitation has already been accepted or declined");
    }
    if (status === "accepted") {
        const user = await (0, users_repository_1.findUserByEmail)(invitation.email);
        if (!user) {
            throw new ApiError_1.ApiError(404, "User not found", "No user found with the email associated with this invitation");
        }
        const org = await (0, organizations_repository_1.getOrgById)(invitation.organizationId);
        if (!org) {
            throw new ApiError_1.ApiError(404, "Organization not found", "Organization not found");
        }
        await (0, organizations_repository_1.joinAnOrganization)({ userId: user.id, orgId: org.id });
    }
    return await (0, invitation_repository_1.updateInvitationStatus)({ token, status });
};
exports.updateInvitationStatusService = updateInvitationStatusService;
//# sourceMappingURL=invitation.service.js.map