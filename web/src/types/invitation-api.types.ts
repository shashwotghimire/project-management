export type InvitationStatus = "pending" | "accepted" | "declined";

export interface Invitation {
  id: string;
  email: string;
  organizationId: string;
  invitedBy: string;
  status: InvitationStatus;
  token: string;
  createdAt: string;
  updatedAt: string;
}

export interface InvitationResponse {
  success: boolean;
  message: string;
  data: Invitation;
}
