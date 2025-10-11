import { Controller, Get, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '@modules/auth/decorators/public.decorator';
import { MongoDBPrismaService } from '@modules/prisma/services/mongodb.prisma.service';
import { MySQLPrismaService } from '@modules/prisma/services/mysql.prisma.service';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'test/db',
})
@Public()
@ApiTags('Test API')
export class DBTestController {
  constructor(
    private readonly mysql: MySQLPrismaService,
    private readonly mongo: MongoDBPrismaService,
  ) {}
  @Get('mysql/all-users')
  async mysqlTest() {
    const users = await this.mysql.user.findMany();
    return users.map((user) => ({ ...user, id: user.id.toString() }));
  }

  @Post('mongo/create-test')
  async mongoCreateTest() {
    const result = await this.mongo.trackPoint.create({
      data: {
        lat: 37.7749,
        lon: -122.4194,
        timestamp: new Date(),
      },
    });

    return result;
  }
}
