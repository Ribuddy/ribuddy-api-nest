import { registerAs } from '@nestjs/config';

export const GOOGLE_OAUTH_CONFIG = Symbol('GOOGLE_OAUTH_CONFIG');

export const GoogleOAuthConfig = registerAs(GOOGLE_OAUTH_CONFIG, () => ({
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  v1CallbackUrl: process.env.GOOGLE_V1_CALLBACK_URL as string,
  v3CallbackUrl: process.env.GOOGLE_V3_CALLBACK_URL as string,
}));
