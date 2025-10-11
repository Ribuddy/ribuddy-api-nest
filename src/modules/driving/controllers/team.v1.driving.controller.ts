import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@common/constants/api-tags.constants';

@ApiTags(API_TAGS.DRIVING_TEAM)
@ApiBearerAuth()
@Controller({
  path: 'driving/team',
  version: '1',
})
export class DrivingTeamV1Controller {
  constructor() {}
}
