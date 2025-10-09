import { Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import axios from 'axios';

import { DiscordConfig } from '@modules/message/configs/discord.config';

@Injectable()
export class DiscordMessageService {
  constructor(private readonly discordConfig: ConfigType<typeof DiscordConfig>) {}

  async sendMessage(message: string, username?: string, avatarUrl?: string) {
    const data = await axios.post(this.discordConfig.webhookUrl, {
      content: message,
    });
  }
}
