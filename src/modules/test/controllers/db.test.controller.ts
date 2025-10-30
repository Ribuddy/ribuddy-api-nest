import { Controller, Get, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RedisService } from '@liaoliaots/nestjs-redis';

import { API_TAGS } from '@common/constants/api-tags.constants';

import { Public } from '@modules/auth/decorators/public.decorator';
import { MongoDBPrismaService } from '@modules/prisma/services/mongodb.prisma.service';
import { MySQLPrismaService } from '@modules/prisma/services/mysql.prisma.service';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'test/db',
})
@Public()
@ApiTags(API_TAGS.TEST)
@ApiBearerAuth()
export class DBTestController {
  constructor(
    private readonly mysql: MySQLPrismaService,
    private readonly mongo: MongoDBPrismaService,
    private readonly redis: RedisService,
  ) {}
  @Get('mysql/all-users')
  async mysqlTest() {
    const users = await this.mysql.user.findMany();
    return users.map((user) => ({ ...user, id: user.id.toString() }));
  }

  @Post('mongo/create-test')
  async mongoCreateTest() {}

  @Post('redis/set-test')
  redisSetTest() {
    const redis = this.redis.getOrThrow();
    // redis.geoadd()
    return redis.set('test-key', 'test-value');
  }
}
