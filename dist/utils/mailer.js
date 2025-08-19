"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = sendMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const logger_1 = require("../config/logger");
const transporter = nodemailer_1.default.createTransport({
    host: env_1.env.SMTP_HOST,
    port: env_1.env.SMTP_PORT,
    secure: env_1.env.SMTP_SECURE,
    auth: env_1.env.SMTP_USER ? { user: env_1.env.SMTP_USER, pass: env_1.env.SMTP_PASS } : undefined,
});
async function sendMail(to, subject, html) {
    try {
        const info = await transporter.sendMail({ from: env_1.env.SMTP_FROM, to, subject, html });
        logger_1.logger.info('Email sent', { messageId: info.messageId, to });
        return info;
    }
    catch (err) {
        logger_1.logger.error('Email send error', { err, to, subject });
        throw err;
    }
}
