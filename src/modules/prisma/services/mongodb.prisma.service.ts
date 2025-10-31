import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@generated/prisma/mongodb';

@Injectable()
export class MongoDBPrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  createGeoPoint(lat: number, lon: number, timestamp: Date, ele?: number) {
    return {
      type: 'Point',
      coordinates: ele ? [lon, lat, ele] : [lon, lat],
      timestamp,
    };
  }
}
