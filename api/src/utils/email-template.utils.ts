export function invitationEmailTemplate(
  orgName: string,
  inviterName: string,
  inviteUrl: string,
  inviterAvatarUrl?: string,
): string {
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
              ${inviterAvatarUrl ? `<p style="margin:0 0 16px;"><img src="${inviterAvatarUrl}" alt="${inviterName}" width="48" height="48" style="border-radius:50%;vertical-align:middle;margin-right:10px;"/><strong style="vertical-align:middle;">${inviterName}</strong></p>` : ""}
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

export function verifyEmailTemplate(username: string, verificationUrl: string): string {
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

export function taskAssignedEmailTemplate(
  username: string,
  taskTitle: string,
  projectName: string,
  assignedByName: string,
  assignedByAvatarUrl?: string,
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New task assigned to you</title>
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
              <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">You've been assigned a new task</h2>
              <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">Hi ${username},</p>
              ${assignedByAvatarUrl ? `<p style="margin:0 0 16px;"><img src="${assignedByAvatarUrl}" alt="${assignedByName}" width="48" height="48" style="border-radius:50%;vertical-align:middle;margin-right:10px;"/><strong style="vertical-align:middle;">${assignedByName}</strong></p>` : ""}
              <p style="margin:0 0 32px;color:#374151;font-size:15px;line-height:1.6;">
                <strong>${assignedByName}</strong> has assigned you the task <strong>${taskTitle}</strong> in project <strong>${projectName}</strong>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">&copy; ${new Date().getFullYear()} Project Management. All rights reserved.</p>
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

export function addedToProjectEmailTemplate(
  username: string,
  projectName: string,
  addedByName: string,
  addedByAvatarUrl?: string,
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Added to a project</title>
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
              <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">You've been added to a project</h2>
              <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">Hi ${username},</p>
              ${addedByAvatarUrl ? `<p style="margin:0 0 16px;"><img src="${addedByAvatarUrl}" alt="${addedByName}" width="48" height="48" style="border-radius:50%;vertical-align:middle;margin-right:10px;"/><strong style="vertical-align:middle;">${addedByName}</strong></p>` : ""}
              <p style="margin:0 0 32px;color:#374151;font-size:15px;line-height:1.6;">
                <strong>${addedByName}</strong> has added you to the project <strong>${projectName}</strong>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">&copy; ${new Date().getFullYear()} Project Management. All rights reserved.</p>
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

export function inviteAcceptedEmailTemplate(adminUsername: string, inviteeName: string, orgName: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Invitation accepted</title>
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
              <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">Invitation accepted</h2>
              <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">Hi ${adminUsername},</p>
              <p style="margin:0 0 32px;color:#374151;font-size:15px;line-height:1.6;">
                <strong>${inviteeName}</strong> has accepted your invitation and joined <strong>${orgName}</strong>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">&copy; ${new Date().getFullYear()} Project Management. All rights reserved.</p>
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

export function commentCreatedEmailTemplate(
  recipientUsername: string,
  commenterName: string,
  taskTitle: string,
  commentContent: string,
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New comment on ${taskTitle}</title>
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
              <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">New comment on task: ${taskTitle}</h2>
              <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">Hi ${recipientUsername},</p>
              <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.6;">
                <strong>${commenterName}</strong> left a comment on the task <strong>${taskTitle}</strong>:
              </p>
              <blockquote style="margin:0 0 32px;padding:16px 20px;background:#f9fafb;border-left:4px solid #4f46e5;border-radius:4px;color:#374151;font-size:15px;line-height:1.6;">
                ${commentContent}
              </blockquote>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">&copy; ${new Date().getFullYear()} Project Management. All rights reserved.</p>
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

export function orgCreatedEmailTemplate(username: string, orgName: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Organization created</title>
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
              <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">Your organization is ready</h2>
              <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">Hi ${username},</p>
              <p style="margin:0 0 32px;color:#374151;font-size:15px;line-height:1.6;">
                You've successfully created the organization <strong>${orgName}</strong>. You can now invite members and create projects under this organization.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">&copy; ${new Date().getFullYear()} Project Management. All rights reserved.</p>
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

export function projectCreatedEmailTemplate(username: string, projectName: string, orgName: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Project created</title>
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
              <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">Your project is ready</h2>
              <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">Hi ${username},</p>
              <p style="margin:0 0 32px;color:#374151;font-size:15px;line-height:1.6;">
                You've successfully created the project <strong>${projectName}</strong> under <strong>${orgName}</strong>. You can now add members and start creating tasks.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">&copy; ${new Date().getFullYear()} Project Management. All rights reserved.</p>
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

export function removedFromProjectEmailTemplate(
  username: string,
  projectName: string,
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Removed from a project</title>
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
              <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">You've been removed from a project</h2>
              <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">Hi ${username},</p>
              <p style="margin:0 0 32px;color:#374151;font-size:15px;line-height:1.6;">
                You have been removed from the project <strong>${projectName}</strong>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">&copy; ${new Date().getFullYear()} Project Management. All rights reserved.</p>
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

export function channelMessageEmailTemplate(
  recipientUsername: string,
  senderUsername: string,
  channelName: string,
  projectName: string,
  content: string,
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" /><title>New message</title></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1);">
          <tr>
            <td style="background:#111827;padding:32px 40px;">
              <h1 style="margin:0;color:#fff;font-size:22px;">New message in #${channelName}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <p style="margin:0 0 12px;color:#374151;font-size:15px;line-height:1.6;">Hi ${recipientUsername},</p>
              <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">
                <strong>${senderUsername}</strong> posted a message in <strong>#${channelName}</strong> (${projectName}):
              </p>
              <blockquote style="margin:0 0 24px;padding:12px 16px;background:#f9fafb;border-left:4px solid #6366f1;border-radius:4px;color:#111827;font-size:15px;line-height:1.6;">
                ${content}
              </blockquote>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;color:#9ca3af;font-size:12px;">&copy; ${new Date().getFullYear()} Project Management. All rights reserved.</p>
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
