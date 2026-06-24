"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.respondToInvitation = exports.createInvitation = void 0;
const asyncHandler_1 = __importDefault(require("../helpers/asyncHandler"));
const invitation_service_1 = require("../services/invitation.service");
const check_string_helper_1 = require("../helpers/check-string.helper");
const ApiResponse_1 = require("../helpers/ApiResponse");
exports.createInvitation = (0, asyncHandler_1.default)(async (req, res) => {
    const { email, organizationId } = req.body;
    const invitedBy = req.user.id;
    const invitation = await (0, invitation_service_1.createInvitationService)({
        email,
        organizationId,
        invitedBy,
    });
    res.status(201).json(invitation);
});
exports.respondToInvitation = (0, asyncHandler_1.default)(async (req, res) => {
    const token = (0, check_string_helper_1.isString)(req.query.token);
    const { response } = req.body;
    const updatedInvitation = await (0, invitation_service_1.updateInvitationStatusService)({
        token,
        status: response,
    });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(true, "Invitation response recorded", updatedInvitation));
});
//# sourceMappingURL=invitation.controller.js.map