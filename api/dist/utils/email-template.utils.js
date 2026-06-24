"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invitationEmailTemplate = invitationEmailTemplate;
exports.verifyEmailTemplate = verifyEmailTemplate;
function invitationEmailTemplate(orgName, inviterName, inviteUrl) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>You're invited to join ${orgName}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#4f46e5;padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Project Management</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">You've been invited to join ${orgName}</h2>
              <p style="margin:0 0 32px;color:#374151;font-size:15px;line-height:1.6;">
                <strong>${inviterName}</strong> has invited you to join <strong>${orgName}</strong> on Project Management.
                Click the button below to accept the invitation.
              </p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:6px;background:#4f46e5;">
                    <a href="${inviteUrl}"
                       style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:6px;">
                      Accept Invitation
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:32px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">
                Or copy and paste this link into your browser:<br/>
                <a href="${inviteUrl}" style="color:#4f46e5;word-break:break-all;">${inviteUrl}</a>
              </p>
              <p style="margin:24px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">
                This invitation expires in 7 days. If you did not expect this invitation, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                &copy; ${new Date().getFullYear()} Project Management. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
function verifyEmailTemplate(username, verificationUrl) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify your email</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#4f46e5;padding:32px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">Project Management</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">Verify your email address</h2>
              <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">Hi ${username},</p>
              <p style="margin:0 0 32px;color:#374151;font-size:15px;line-height:1.6;">
                Thanks for signing up. Click the button below to verify your email address and activate your account.
              </p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:6px;background:#4f46e5;">
                    <a href="${verificationUrl}"
                       style="display:inline-block;padding:14px 28px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:6px;">
                      Verify Email
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:32px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">
                Or copy and paste this link into your browser:<br/>
                <a href="${verificationUrl}" style="color:#4f46e5;word-break:break-all;">${verificationUrl}</a>
              </p>
              <p style="margin:24px 0 0;color:#6b7280;font-size:13px;line-height:1.6;">
                This link expires in 24 hours. If you did not create an account, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                &copy; ${new Date().getFullYear()} Project Management. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
//# sourceMappingURL=email-template.utils.js.map