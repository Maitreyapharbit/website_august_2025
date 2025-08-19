import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '../config/database';
import { config } from '../config/environment';
import { ApiError } from '../middleware/errorHandler';
import { JwtPayload, User } from '../types';
import { logger } from '../config/logger';

export class AuthService {
  static async login(email: string, password: string) {
    try {
      // Get user from database
      const { data: user, error } = await supabaseAdmin
        .from('admins')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !user) {
        throw new ApiError(401, 'Invalid credentials');
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        throw new ApiError(401, 'Invalid credentials');
      }

      // Generate JWT token
      const payload: JwtPayload = {
        userId: user.id,
        email: user.email
      };

      const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '24h' });

      logger.info('User logged in successfully', { userId: user.id, email: user.email });

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at
        }
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      logger.error('Login error:', error);
      throw new ApiError(500, 'Login failed');
    }
  }

  static async verifyToken(token: string): Promise<JwtPayload> {
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
      
      // Verify user still exists
      const { data: user, error } = await supabaseAdmin
        .from('admins')
        .select('id, email')
        .eq('id', decoded.userId)
        .single();

      if (error || !user) {
        throw new ApiError(401, 'User not found');
      }

      return decoded;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(401, 'Invalid token');
    }
  }

  static async createAdminUser(email: string, password: string) {
    try {
      // Check if admin already exists
      const { data: existing } = await supabaseAdmin
        .from('admins')
        .select('id')
        .eq('email', email)
        .single();

      if (existing) {
        throw new ApiError(409, 'Admin user already exists');
      }

      // Hash password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Create admin user
      const { data: admin, error } = await supabaseAdmin
        .from('admins')
        .insert({
          email,
          password_hash: passwordHash
        })
        .select()
        .single();

      if (error) {
        throw new ApiError(500, 'Failed to create admin user');
      }

      logger.info('Admin user created successfully', { email });
      return admin;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      logger.error('Create admin error:', error);
      throw new ApiError(500, 'Failed to create admin user');
    }
  }
}