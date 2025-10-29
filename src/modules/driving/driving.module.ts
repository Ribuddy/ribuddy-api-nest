import { Module } from '@nestjs/common';

import { DrivingEventsV1Controller } from '@modules/driving/controllers/event.driving.controller';
import { LocationV1Controller } from '@modules/driving/controllers/location.v1.controller';
import { DrivingTeamV1Controller } from '@modules/driving/controllers/team.v1.driving.controller';
import { DriveLocationService } from '@modules/driving/services/drive-location.service';
import { DrivingEventService } from '@modules/driving/services/event.driving.service';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [DrivingEventsV1Controller, DrivingTeamV1Controller, LocationV1Controller],
  providers: [DrivingEventService, DriveLocationService],
})
export class DrivingModule {}
