import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'very_secretT1!';

export function generateToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '16h' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
