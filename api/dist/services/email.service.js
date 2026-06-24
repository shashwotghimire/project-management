"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const nodemailer_config_1 = require("../configs/nodemailer.config");
async function sendEmail(to, subject, html) {
    try {
        await nodemailer_config_1.nodemailerConfig.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        });
    }
    catch (e) {
        console.error(e);
        throw new Error("Failed to send email");
    }
}
//# sourceMappingURL=email.service.js.map