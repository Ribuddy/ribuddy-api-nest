import { Global, Module } from '@nestjs/common';

import { MongoDBPrismaService } from '@modules/prisma/services/mongodb.prisma.service';

import { MySQLPrismaService } from './services/mysql.prisma.service';

@Global()
@Module({
  providers: [MySQLPrismaService, MongoDBPrismaService],
  exports: [MySQLPrismaService, MongoDBPrismaService],
})
export class PrismaModule {}
