import { ApiError } from "../helpers/ApiError";
import { createNotificationService } from "./notifications.service";
import {
  createInvitation,
  existingPendingInvitation,
  getInvitationByToken,
  getInvitationDetailsByToken,
  updateInvitationStatus,
} from "../repositories/invitation.repository";
import {
  getOrgByAdminId,
  getOrgById,
  joinAnOrganization,
} from "../repositories/organizations.repository";
import { createInvitationToken } from "../utils/crypto.utils";
import { sendEmail } from "./email.service";
import { invitationEmailTemplate, inviteAcceptedEmailTemplate } from "../utils/email-template.utils";
import {
  findUserByEmail,
  findUserById,
} from "../repositories/users.repository";
import { emailQueue } from "../queues/email.queue";

export const getInvitationDetailsService = async (token: string) => {
  const invitation = await getInvitationDetailsByToken(token);
  if (!invitation) {
    throw new ApiError(404, "Invitation not found", "Invitation not found");
  }
  return invitation;
};

export const createInvitationService = async ({
  email,
  organizationId,
  invitedBy,
}: {
  email: string;
  organizationId: string;
  invitedBy: string;
}) => {
  const org = await getOrgById(organizationId);
  if (!org) {
    throw new ApiError(404, "Organization not found", "Organization not found");
  }
  const user = await findUserById(invitedBy);
  if (!user) {
    throw new ApiError(404, "User not found", "User not found");
  }
  const isSenderAdmin = await getOrgByAdminId(invitedBy, organizationId);
  if (!isSenderAdmin) {
    throw new ApiError(
      403,
      "You do not have permission to send invitations.",
      "Forbidden",
    );
  }
  const existingInvitation = await existingPendingInvitation({
    email,
    organizationId,
  });
  if (existingInvitation) {
    throw new ApiError(
      400,
      "Invitation already sent.",
      "Invitation already sent to this user",
    );
  }
  const invitationToken = createInvitationToken();
  const inviteUrl = `${process.env.FRONTEND_ORIGIN}/invite?token=${invitationToken}`;
  await emailQueue.add(
    "org-invitation",
    {
      to: email,
      subject: `You're invited to join ${org.name}`,
      html: invitationEmailTemplate(org.name, user.username, inviteUrl, user.gravatarUrl ?? undefined),
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
      removeOnComplete: true,
    },
  );
  return await createInvitation({
    email,
    organizationId,
    invitedBy,
    token: invitationToken,
  });
};

export const updateInvitationStatusService = async ({
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
  if (invitation.status !== "pending") {
    throw new ApiError(
      400,
      "Invitation already responded to.",
      "This invitation has already been accepted or declined",
    );
  }
  if (status === "accepted") {
    const user = await findUserByEmail(invitation.email);
    if (!user) {
      throw new ApiError(
        404,
        "User not found",
        "No user found with the email associated with this invitation",
      );
    }
    const org = await getOrgById(invitation.organizationId);
    if (!org) {
      throw new ApiError(
        404,
        "Organization not found",
        "Organization not found",
      );
    }
    await joinAnOrganization({ userId: user.id, orgId: org.id });

    const admin = await findUserById(org.adminId);
    if (admin) {
      await createNotificationService({
        userId: admin.id,
        orgId: org.id,
        title: "Invitation accepted",
        message: `${user.username} accepted your invitation to join ${org.name}`,
      });
      await emailQueue.add("invite-accepted", {
        to: admin.email,
        subject: `${user.username} accepted your invitation to ${org.name}`,
        html: inviteAcceptedEmailTemplate(admin.username, user.username, org.name),
      });
    }
  }
  return await updateInvitationStatus({ token, status });
};
