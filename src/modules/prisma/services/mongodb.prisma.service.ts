import { Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@generated/prisma/mongodb';

@Injectable()
export class MongoDBPrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * GeoJSON Point 객체 생성
   *
   * lat, lon, timestamp, ele(선택적)를 받아서 GeoJSON Point 객체를 반환합니다.
   */
  createGeoPoint(lat: number, lon: number, timestamp: Date, ele?: number) {
    return {
      type: 'Point',
      coordinates: ele ? [lon, lat, ele] : [lon, lat],
      timestamp,
    };
  }
}
