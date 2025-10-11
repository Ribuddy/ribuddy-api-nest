import { Module } from '@nestjs/common';

import { DrivingEventsV1Controller } from '@modules/driving/controllers/event.driving.controller';
import { DrivingTeamV1Controller } from '@modules/driving/controllers/team.v1.driving.controller';
import { DrivingEventService } from '@modules/driving/services/event.driving.service';

@Module({
  imports: [],
  controllers: [DrivingEventsV1Controller, DrivingTeamV1Controller],
  providers: [DrivingEventService],
})
export class DrivingModule {}
