import { Module } from '@nestjs/common';

import { DiscordMessageService } from '@modules/message/services/discord.message.service';

@Module({
  imports: [],
  controllers: [],
  providers: [DiscordMessageService],
})
export class MessageModule {}
