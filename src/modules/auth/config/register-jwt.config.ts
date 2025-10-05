import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export const REGISTER_JWT_CONFIG = Symbol('REGISTER_JWT_CONFIG');

export const RegisterJwtConfig = registerAs(REGISTER_JWT_CONFIG, () => ({
  secret: process.env.REGISTER_JWT_SECRET as string,
  expiresIn: process.env.REGISTER_JWT_EXPIRES_IN as string,
}));
