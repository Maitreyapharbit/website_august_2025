import jwt from 'jsonwebtoken';

export function getJwtSecret() {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new Error('JWT_ACCESS_SECRET is not configured');
  }
  return secret;
}

export function signTokens(payload) {
  const secret = getJwtSecret();
  const access = jwt.sign(payload, secret, { expiresIn: '24h' });
  const refresh = jwt.sign(payload, secret, { expiresIn: '7d' });
  return { access, refresh };
}

export function verifyToken(token) {
  const secret = getJwtSecret();
  return jwt.verify(token, secret);
}

export function signAccessToken(payload) {
  return signTokens(payload).access;
}

export function signRefreshToken(payload) {
  return signTokens(payload).refresh;
}

export function verifyAccessToken(token) {
  return verifyToken(token);
}

export function verifyRefreshToken(token) {
  return verifyToken(token);
}

