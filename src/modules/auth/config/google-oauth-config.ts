import { registerAs } from '@nestjs/config';

export const GOOGLE_OAUTH_CONFIG = Symbol('GOOGLE_OAUTH_CONFIG');

export const GoogleOAuthConfig = registerAs(GOOGLE_OAUTH_CONFIG, () => ({
  clientId: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
}));
