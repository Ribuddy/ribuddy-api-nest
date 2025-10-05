import { registerAs } from '@nestjs/config';

export const FRONTEND_URL_CONFIG = Symbol('FRONTEND_URL_CONFIG');

export const FrontendUrlConfig = registerAs(FRONTEND_URL_CONFIG, () => ({
  localUrl: process.env.FRONTEND_LOCAL_URL as string,
  devUrl: process.env.FRONTEND_DEVELOPMENT_URL as string,
  prodUrl: process.env.FRONTEND_PROD_URL as string,
}));
