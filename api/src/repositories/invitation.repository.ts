import { ApiError } from "../helpers/ApiError";
import { Invitations } from "../models/invitation.model";

export const existingPendingInvitation = async ({
  email,
  organizationId,
}: {
  email: string;
  organizationId: string;
}) => {
  return Invitations.findOne({
    where: {
      email,
      organizationId,
      status: "pending",
    },
  });
};

export const getInvitationByToken = async (token: string) => {
  return Invitations.findOne({
    where: { token },
  });
};

export const getInvitationDetailsByToken = async (token: string) => {
  return Invitations.findOne({
    where: { token },
    include: [
      { association: "organization", attributes: ["id", "name"] },
      { association: "inviter", attributes: ["id", "username"] },
    ],
  });
};

export const createInvitation = async ({
  email,
  organizationId,
  invitedBy,
  token,
}: {
  email: string;
  organizationId: string;
  invitedBy: string;
  token: string;
}) => {
  return Invitations.create({
    email,
    organizationId,
    invitedBy,
    token,
    status: "pending",
  });
};

export const updateInvitationStatus = async ({
  token,
  status,
}: {
  token: string;
  status: "accepted" | "declined";
}) => {
  const invitation = await getInvitationByToken(token);
  if (!invitation) {
    throw new ApiError(404, "Invitation not found", "Invitation not found");
  }
  invitation.status = status;
  await invitation.save();
  return invitation;
};
