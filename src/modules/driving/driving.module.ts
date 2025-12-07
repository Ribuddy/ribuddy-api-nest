import { Module } from '@nestjs/common';

import { DrivingEventsV1Controller } from '@modules/driving/controllers/event.driving.controller';
import { DrivingStatisticsV1Controller } from '@modules/driving/controllers/statistics.v1.driving.controller';
import { DrivingTeamV1Controller } from '@modules/driving/controllers/team.v1.driving.controller';
import { DrivingTestController } from '@modules/driving/controllers/test.controller';
import { DriveLocationService } from '@modules/driving/services/drive-location.service';
import { DrivingEventService } from '@modules/driving/services/event.driving.service';
import { DrivingStatisticsService } from '@modules/driving/services/statistics.driving.service';
import { MapModule } from '@modules/map/map.module';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [UsersModule, MapModule],
  controllers: [
    DrivingEventsV1Controller,
    DrivingTeamV1Controller,
    DrivingTestController,
    DrivingStatisticsV1Controller,
  ],
  providers: [DrivingEventService, DriveLocationService, DrivingStatisticsService],
})
export class DrivingModule {}
