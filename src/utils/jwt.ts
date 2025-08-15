import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { env } from '../config/env';

export type JwtPayload = { userId: string; role: string; companyId?: string };

const accessSecret: Secret = env.JWT_ACCESS_SECRET as string;
const refreshSecret: Secret = env.JWT_REFRESH_SECRET as string;

export function signAccessToken(payload: JwtPayload) {
	const options: SignOptions = { expiresIn: env.JWT_ACCESS_EXPIRES } as any;
	return jwt.sign(payload as any, accessSecret, options);
}

export function signRefreshToken(payload: JwtPayload) {
	const options: SignOptions = { expiresIn: env.JWT_REFRESH_EXPIRES } as any;
	return jwt.sign(payload as any, refreshSecret, options);
}

export function verifyAccessToken(token: string): JwtPayload {
	return jwt.verify(token, accessSecret) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
	return jwt.verify(token, refreshSecret) as JwtPayload;
}