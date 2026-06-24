"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodemailerConfig = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
exports.nodemailerConfig = nodemailer_1.default.createTransport({
    host: "smtp.resend.com",
    secure: true,
    port: 465,
    auth: {
        user: "resend",
        pass: process.env.EMAIL_PASS,
    },
});
//# sourceMappingURL=nodemailer.config.js.map