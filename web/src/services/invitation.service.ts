import api from "@/lib/axios";
import { InvitationResponse } from "@/types/invitation-api.types";

export interface InvitationDetails {
  id: string;
  email: string;
  status: string;
  organization: { id: string; name: string };
  inviter: { id: string; username: string };
}

export const getInvitationDetailsService = async (token: string) => {
  const res = await api.get<{ data: InvitationDetails }>(
    `/invitations/details?token=${token}`,
  );
  return res.data.data;
};

export const sendInvitationService = async ({
  email,
  organizationId,
}: {
  email: string;
  organizationId: string;
}) => {
  const res = await api.post<InvitationResponse>(`/invitations`, {
    email,
    organizationId,
  });
  return res.data;
};

export const acceptInvitationService = async (invitationCode: string) => {
  const res = await api.post<InvitationResponse>(
    `/invitations/respond?token=${invitationCode}`,
    { response: "accepted" },
  );
  return res.data;
};

export const declineInvitationService = async (invitationCode: string) => {
  const res = await api.post<InvitationResponse>(
    `/invitations/respond?token=${invitationCode}`,
    { response: "declined" },
  );
  return res.data;
};
