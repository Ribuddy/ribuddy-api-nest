import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@common/constants/api-tags.constants';

import { RequestContextService } from '@modules/als/services/request-context.service';
import { DriveLocationService } from '@modules/driving/services/drive-location.service';

@Controller({
  path: '/location',
  version: '1',
})
@ApiTags(API_TAGS.DRIVING)
@ApiBearerAuth()
export class LocationV1Controller {
  constructor(
    private readonly locationService: DriveLocationService,
    private readonly reqContext: RequestContextService,
  ) {}
}
