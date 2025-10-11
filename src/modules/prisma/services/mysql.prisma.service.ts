import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@generated/prisma/mysql';

@Injectable()
export class MySQLPrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
