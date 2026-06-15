import api from "@/lib/axios";
import { InvitationResponse } from "@/types/invitation-api.types";

export const acceptInvitationService = async (invitationCode: string) => {
  const res = await api.post<InvitationResponse>(
    `/invitations/respond?token=${invitationCode}`,
    {
      response: "accepted",
    },
  );
  return res.data;
};
