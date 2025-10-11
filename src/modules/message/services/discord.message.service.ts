import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

import axios from 'axios';

import { DiscordConfig } from '@modules/message/configs/discord.config';

@Injectable()
export class DiscordMessageService {
  constructor(private readonly configService: ConfigService) {}

  async sendMessage(message: string, username?: string, avatarUrl?: string) {
    const discordConfig =
      this.configService.getOrThrow<ConfigType<typeof DiscordConfig>>('discord');

    const data = await axios.post(discordConfig.webhookUrl, {
      content: message,
    });
  }
}
