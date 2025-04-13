import jwt from 'jsonwebtoken';

import ENV_VARIABLES from '../config/envs';

export type JwtPayload = {
  id: number;
  email: string;
  name: string;
  iat: number;
  exp: number;
};

export function generateToken(payload: JwtPayload) {
  return jwt.sign(payload, ENV_VARIABLES.JWT_SECRET, { expiresIn: '16h' });
}

export function verifyToken(token: string) {
  return jwt.verify(token, ENV_VARIABLES.JWT_SECRET);
}
