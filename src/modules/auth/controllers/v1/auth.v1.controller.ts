import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@common/constants/api-tags.constants';

@Controller({
  version: '1',
  path: 'auth',
})
@ApiTags(API_TAGS.AUTH)
@ApiBearerAuth()
export class AuthV1Controller {
  constructor() {}
}
