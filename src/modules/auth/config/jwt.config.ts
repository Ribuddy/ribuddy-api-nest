import { registerAs } from '@nestjs/config';

export const JWT_CONFIG = Symbol('JWT_CONFIG');

export const JwtConfig = registerAs(JWT_CONFIG, () => ({
  secret: process.env.JWT_SECRET as string,
  signOptions: { expiresIn: process.env.JWT_EXPIRES_IN as string },
}));
