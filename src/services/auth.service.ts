import bcrypt from 'bcryptjs';
import { prisma } from '../config/prisma';
import { signAccessToken, signRefreshToken } from '../utils/jwt';
import { ApiError } from '../middleware/error';
import { StatusCodes } from 'http-status-codes';
import { sendMail } from '../utils/mailer';
import { v4 as uuid } from 'uuid';

export class AuthService {
	static async register(params: { email: string; password: string; companyName: string; firstName?: string | null; lastName?: string | null }) {
		const existing = await prisma.user.findUnique({ where: { email: params.email } });
		if (existing) throw new ApiError(StatusCodes.CONFLICT, 'Email already registered');
		const company = await prisma.company.create({ data: { name: params.companyName } });
		const passwordHash = await bcrypt.hash(params.password, 10);
		const user = await prisma.user.create({
			data: {
				email: params.email,
				passwordHash,
				role: 'COMPANY',
				firstName: params.firstName || undefined,
				lastName: params.lastName || undefined,
				companyId: company.id,
			},
		});
		const tokens = this.generateTokens(user.id, user.role, user.companyId || undefined);
		return { user, tokens };
	}

	static async login(email: string, password: string) {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
		const match = await bcrypt.compare(password, user.passwordHash);
		if (!match) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
		const tokens = this.generateTokens(user.id, user.role, user.companyId || undefined);
		return { user, tokens };
	}

	static async refresh(userId: string, role: string, companyId?: string) {
		return this.generateTokens(userId, role, companyId);
	}

	static async getProfile(userId: string) {
		return prisma.user.findUnique({ where: { id: userId }, include: { company: true } });
	}

	static async updateProfile(userId: string, data: { firstName?: string; lastName?: string }) {
		return prisma.user.update({ where: { id: userId }, data });
	}

	static async forgotPassword(email: string) {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) return; // do not reveal
		const token = uuid();
		await prisma.auditLog.create({ data: { productId: 'password-reset', action: 'REQUEST', actorId: user.id, metadata: { token } } });
		await sendMail(email, 'Password reset', `<p>Your reset token: ${token}</p>`);
		return;
	}

	static async resetPassword(email: string, token: string, newPassword: string) {
		// In a real app, persist token; here we just accept any token logged above
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid email or token');
		const passwordHash = await bcrypt.hash(newPassword, 10);
		await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
	}

	private static generateTokens(userId: string, role: string, companyId?: string) {
		const access = signAccessToken({ userId, role, companyId });
		const refresh = signRefreshToken({ userId, role, companyId });
		return { access, refresh };
	}
}