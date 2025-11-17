import { registerAs } from '@nestjs/config';

export const TMAP_CONFIG = Symbol('TMAP_CONFIG');

export const TmapConfig = registerAs(TMAP_CONFIG, () => ({
  appKey: process.env.TMAP_APP_KEY as string,
  ovsAccessKey: process.env.TMAP_OVS_ACCESS_KEY as string,
}));
