import { Body, Controller, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@common/constants/api-tags.constants';

import { Public } from '@modules/auth/decorators/public.decorator';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'test/basic',
})
@Public()
@ApiTags(API_TAGS.TEST)
@ApiBearerAuth()
export class BasicTestController {
  @Post('mirror')
  mirror(@Body() body: any) {
    return body;
  }
}
