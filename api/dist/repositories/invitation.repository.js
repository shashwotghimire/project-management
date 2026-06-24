"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInvitationStatus = exports.createInvitation = exports.getInvitationByToken = exports.existingPendingInvitation = void 0;
const ApiError_1 = require("../helpers/ApiError");
const invitation_model_1 = require("../models/invitation.model");
const existingPendingInvitation = async ({ email, organizationId, }) => {
    return invitation_model_1.Invitations.findOne({
        where: {
            email,
            organizationId,
            status: "pending",
        },
    });
};
exports.existingPendingInvitation = existingPendingInvitation;
const getInvitationByToken = async (token) => {
    return invitation_model_1.Invitations.findOne({
        where: { token },
    });
};
exports.getInvitationByToken = getInvitationByToken;
const createInvitation = async ({ email, organizationId, invitedBy, token, }) => {
    return invitation_model_1.Invitations.create({
        email,
        organizationId,
        invitedBy,
        token,
        status: "pending",
    });
};
exports.createInvitation = createInvitation;
const updateInvitationStatus = async ({ token, status, }) => {
    const invitation = await (0, exports.getInvitationByToken)(token);
    if (!invitation) {
        throw new ApiError_1.ApiError(404, "Invitation not found", "Invitation not found");
    }
    invitation.status = status;
    await invitation.save();
    return invitation;
};
exports.updateInvitationStatus = updateInvitationStatus;
//# sourceMappingURL=invitation.repository.js.map