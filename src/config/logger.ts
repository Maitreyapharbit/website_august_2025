import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
	fs.mkdirSync(logsDir, { recursive: true });
}

export const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.errors({ stack: true }),
		winston.format.json()
	),
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.timestamp(),
				winston.format.printf(({ level, message, timestamp, ...meta }: any) => {
					return `${timestamp} ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
				})
			),
		}),
		new winston.transports.File({ filename: path.join(logsDir, 'error.log'), level: 'error' }),
		new winston.transports.File({ filename: path.join(logsDir, 'combined.log') }),
	],
});

export const stream = {
	write: (message: string) => {
		logger.info(message.trim());
	},
};