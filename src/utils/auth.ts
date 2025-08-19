import { NextRequest } from 'next/server';
import { verifyAccessToken } from './jwt';
import { ApiError } from '../middleware/error';

export interface AuthenticatedUser {
  userId: string;
  role: string;
  companyId?: string;
}

export async function authenticateRequest(request: NextRequest): Promise<AuthenticatedUser> {
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  
  if (!token) {
    throw new ApiError(401, 'Authorization required');
  }
  
  try {
    const payload = verifyAccessToken(token);
    return payload as AuthenticatedUser;
  } catch {
    throw new ApiError(401, 'Invalid token');
  }
}

export function authorizeUser(user: AuthenticatedUser, ...roles: string[]): void {
  if (roles.length && !roles.includes(user.role)) {
    throw new ApiError(403, 'Forbidden');
  }
}