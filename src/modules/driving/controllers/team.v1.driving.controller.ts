import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('라이딩 팀')
@Controller({
  path: 'driving/team',
  version: '1',
})
export class DrivingTeamV1Controller {
  constructor() {}
}
