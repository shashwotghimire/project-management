import asyncHandler from "../helpers/asyncHandler";
import { AuthRequest } from "../middlewares/auth.middleware";
import { Response } from "express";
import {
  createInvitationService,
  getInvitationDetailsService,
  updateInvitationStatusService,
} from "../services/invitation.service";
import { isString } from "../helpers/check-string.helper";
import { ApiResponse } from "../helpers/ApiResponse";

export const getInvitationDetails = asyncHandler(
  async (req, res: Response) => {
    const token = isString(req.query.token);
    const invitation = await getInvitationDetailsService(token);
    return res
      .status(200)
      .json(new ApiResponse(true, "Invitation details fetched", invitation));
  },
);

export const createInvitation = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const { email, organizationId } = req.body;
    const invitedBy = req.user.id;
    const invitation = await createInvitationService({
      email,
      organizationId,
      invitedBy,
    });
    res.status(201).json(invitation);
  },
);

export const respondToInvitation = asyncHandler<AuthRequest>(
  async (req: AuthRequest, res: Response) => {
    const token = isString(req.query.token);
    const { response } = req.body;
    const updatedInvitation = await updateInvitationStatusService({
      token,
      status: response,
    });
    return res
      .status(200)
      .json(
        new ApiResponse(
          true,
          "Invitation response recorded",
          updatedInvitation,
        ),
      );
  },
);
