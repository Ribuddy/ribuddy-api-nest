import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export const REFRESH_JWT_CONFIG = Symbol('REFRESH_JWT_CONFIG');

export const RefreshJwtConfig = registerAs(
  REFRESH_JWT_CONFIG,
  (): JwtSignOptions => ({
    secret: process.env.REFRESH_JWT_SECRET as string,
    expiresIn: process.env.REFRESH_JWT_EXPIRES_IN as string,
  }),
);
