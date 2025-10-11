import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@generated/prisma/mongodb';

@Injectable()
export class MongoDBPrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
