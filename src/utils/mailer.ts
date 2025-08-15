import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../config/logger';

const transporter = nodemailer.createTransport({
	host: env.SMTP_HOST,
	port: env.SMTP_PORT,
	secure: env.SMTP_SECURE,
	auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
});

export async function sendMail(to: string, subject: string, html: string) {
	try {
		const info = await transporter.sendMail({ from: env.SMTP_FROM, to, subject, html });
		logger.info('Email sent', { messageId: info.messageId, to });
		return info;
	} catch (err) {
		logger.error('Email send error', { err, to, subject });
		throw err;
	}
}