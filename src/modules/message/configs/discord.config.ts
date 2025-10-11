import { registerAs } from '@nestjs/config';

export const DISCORD_CONFIG = Symbol('DISCORD_CONFIG');

export const DiscordConfig = registerAs(DISCORD_CONFIG, () => ({
  webhookUrl: process.env.DISCORD_WEBHOOK_URL as string,
}));
