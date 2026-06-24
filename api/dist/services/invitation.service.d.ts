export declare const createInvitationService: ({ email, organizationId, invitedBy, }: {
    email: string;
    organizationId: string;
    invitedBy: string;
}) => Promise<import("../models/invitation.model").Invitations>;
export declare const updateInvitationStatusService: ({ token, status, }: {
    token: string;
    status: "accepted" | "declined";
}) => Promise<import("../models/invitation.model").Invitations>;
//# sourceMappingURL=invitation.service.d.ts.map