import { Injectable, NotFoundException } from '@nestjs/common';

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
  // ridingRecord 기준에 넣음
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

  // 급정거 감지 시 추가하는 API
  async recordSuddenStopEvent(ridingRecordId: string, timestamp: Date) {
    const ridingRecord = await this.locService.getRidingRecordInfo(ridingRecordId);

    const suddenStopEvent = await this.mongo.ridingEvent.create({
      data: {
        ridingRecordId,
        type: RidingEventType.SUDDEN_STOP,
        timestamp,
        userId: ridingRecord.recordOwnerId,
      },
    });

    return suddenStopEvent;
  }

  async getTeamRidingEvents(ridingRecordId: string) {
    // const events = await this.mongo.ridingEvent.findMany({
    //   where: {
    //     ridingRecordId,
    //   },
    //   orderBy: {
    //     timestamp: 'asc',
    //   },
    // });
    //
    //
    // return newEvents;

    const ridingRecord = await this.mongo.ridingRecord.findUnique({
      where: {
        id: ridingRecordId,
      },
    });

    if (!ridingRecord) {
      throw new NotFoundException('라이딩 기록이 존재하지 않습니다.');
    }

    const teammateEvents = await this.mongo.ridingEvent.findMany({
      where: {
        userId: {
          in: ridingRecord.participants,
        },
      },
    });

    const alreadySentEvents = ridingRecord.sentEvents;

    const newEvents = teammateEvents.filter((event) => !alreadySentEvents.includes(event.id));

    await this.mongo.ridingRecord.update({
      where: {
        id: ridingRecordId,
      },
      data: {
        sentEvents: {
          push: newEvents.map((event) => event.id),
        },
      },
    });

    return newEvents;
  }
}
