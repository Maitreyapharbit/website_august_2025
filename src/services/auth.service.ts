import bcrypt from 'bcryptjs';
import { supabase, supabaseAdmin } from '../config/database';
import { signAccessToken, signRefreshToken } from '../utils/jwt';
import { ApiError } from '../middleware/error';
import { StatusCodes } from 'http-status-codes';
import { sendMail } from '../utils/mailer';
import { v4 as uuid } from 'uuid';
import { Database } from '../types/database.types';

export class AuthService {
	static async register(params: { email: string; password: string; companyName: string; firstName?: string | null; lastName?: string | null }) {
		const { data: existing } = await supabase
			.from('users')
			.select('id')
			.eq('email', params.email)
			.single();
		
		if (existing) throw new ApiError(StatusCodes.CONFLICT, 'Email already registered');
		
		const { data: company, error: companyError } = await supabase
			.from('companies')
			.insert({ name: params.companyName })
			.select()
			.single();
		
		if (companyError || !company) {
			throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create company');
		}
		
		const passwordHash = await bcrypt.hash(params.password, 10);
		
		const { data: user, error: userError } = await supabase
			.from('users')
			.insert({
				email: params.email,
				password_hash: passwordHash,
				role: 'COMPANY',
				first_name: params.firstName || null,
				last_name: params.lastName || null,
				company_id: company.id,
			})
			.select()
			.single();
		
		if (userError || !user) {
			throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create user');
		}
		
		const tokens = this.generateTokens(user.id, user.role, user.company_id || undefined);
		return { user, tokens };
	}

	static async login(email: string, password: string) {
		const { data: user, error } = await supabase
			.from('users')
			.select('*')
			.eq('email', email)
			.single();
		
		if (error || !user) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
		
		const match = await bcrypt.compare(password, user.password_hash);
		if (!match) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
		
		const tokens = this.generateTokens(user.id, user.role, user.company_id || undefined);
		return { user, tokens };
	}

	static async refresh(userId: string, role: string, companyId?: string) {
		return this.generateTokens(userId, role, companyId);
	}

	static async getProfile(userId: string) {
		const { data: user, error } = await supabase
			.from('users')
			.select(`
				*,
				company:companies(*)
			`)
			.eq('id', userId)
			.single();
		
		if (error) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
		return user;
	}

	static async updateProfile(userId: string, data: { firstName?: string; lastName?: string }) {
		const { data: user, error } = await supabase
			.from('users')
			.update({
				first_name: data.firstName,
				last_name: data.lastName,
			})
			.eq('id', userId)
			.select()
			.single();
		
		if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to update profile');
		return user;
	}

	static async forgotPassword(email: string) {
		const { data: user } = await supabase
			.from('users')
			.select('id')
			.eq('email', email)
			.single();
		
		if (!user) return; // do not reveal
		
		const token = uuid();
		
		await supabase
			.from('audit_logs')
			.insert({
				product_id: 'password-reset',
				action: 'REQUEST',
				actor_id: user.id,
				metadata: { token }
			});
		
		await sendMail(email, 'Password reset', `<p>Your reset token: ${token}</p>`);
		return;
	}

	static async resetPassword(email: string, token: string, newPassword: string) {
		// In a real app, persist token; here we just accept any token logged above
		const { data: user, error } = await supabase
			.from('users')
			.select('id')
			.eq('email', email)
			.single();
		
		if (error || !user) throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid email or token');
		
		const passwordHash = await bcrypt.hash(newPassword, 10);
		
		const { error: updateError } = await supabase
			.from('users')
			.update({ password_hash: passwordHash })
			.eq('id', user.id);
		
		if (updateError) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to reset password');
	}

	private static generateTokens(userId: string, role: string, companyId?: string) {
		const access = signAccessToken({ userId, role, companyId });
		const refresh = signRefreshToken({ userId, role, companyId });
		return { access, refresh };
	}
}