import { registerAs } from '@nestjs/config';

export const TmapConfig = registerAs('tmap', () => ({
  appKey: process.env.TMAP_APP_KEY as string,
  ovsAccessKey: process.env.TMAP_OVS_ACCESS_KEY as string,
}));
