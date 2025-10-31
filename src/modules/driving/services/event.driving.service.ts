import { Injectable } from '@nestjs/common';

import { RidingEventType } from '@generated/prisma/mongodb';

import { DriveLocationService } from '@modules/driving/services/drive-location.service';
import { MongoDBPrismaService } from '@modules/prisma/services/mongodb.prisma.service';

@Injectable()
export class DrivingEventService {
  constructor(
    private readonly mongo: MongoDBPrismaService,
    private readonly locService: DriveLocationService,
  ) {}

  // 사고 감지 시 추가하는 API
  async recordAccidentEvent(ridingRecordId: string, timestamp: Date) {
    const ridingRecord = await this.locService.getRidingRecordInfo(ridingRecordId);

    const accidentEvent = await this.mongo.ridingEvent.create({
      data: {
        ridingRecordId,
        type: RidingEventType.ACCIDENT,
        timestamp,
        userId: ridingRecord.recordOwnerId,
      },
    });

    return accidentEvent;
  }
}
