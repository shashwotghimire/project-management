import { Invitations } from "../models/invitation.model";
export declare const existingPendingInvitation: ({ email, organizationId, }: {
    email: string;
    organizationId: string;
}) => Promise<Invitations | null>;
export declare const getInvitationByToken: (token: string) => Promise<Invitations | null>;
export declare const createInvitation: ({ email, organizationId, invitedBy, token, }: {
    email: string;
    organizationId: string;
    invitedBy: string;
    token: string;
}) => Promise<Invitations>;
export declare const updateInvitationStatus: ({ token, status, }: {
    token: string;
    status: "accepted" | "declined";
}) => Promise<Invitations>;
//# sourceMappingURL=invitation.repository.d.ts.map