import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  VERSION_NEUTRAL,
  Version,
} from '@nestjs/common';

import { CommonCode } from '@common/codes/common.code';
import { CustomException } from '@common/codes/custom.exception';

import { Public } from '@modules/auth/decorators/public.decorator';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'test',
})
export class AppTestController {
  @Public()
  @Get('hello')
  // @Version(['1.1', '1.2'])
  getHello(): string {
    return 'Hello World!';
  }

  @Public()
  @Get('normal-error')
  // @Version(['1.1', '1.2'])
  raiseError() {
    throw new Error('[NORMAL ERROR] 테스트 에러입니다.');
  }

  @Public()
  @Get('http-error')
  // @Version(['1.1', '1.2'])
  raiseHttpError(): string {
    throw new BadRequestException('[HTTP ERROR] 테스트 에러입니다.');
  }

  @Public()
  @Get('custom-error')
  raiseCustomError() {
    throw new CustomException(CommonCode.TEST_CUSTOM_ERROR);
  }
}
