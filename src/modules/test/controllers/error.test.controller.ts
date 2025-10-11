import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Query,
  UseGuards,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CustomException } from '@common/codes/custom.exception';
import { CommonErrorCode } from '@common/codes/error/common.error.code';
import { CommonSuccessCode } from '@common/codes/success/common.success.code';
import { API_TAGS } from '@common/constants/api-tags.constants';
import { CustomResponse } from '@common/decorators/response/custom-response.decorator';

import { ALS, AlsInstance } from '@modules/als/constants/als.constants';
import { RequestContextService } from '@modules/als/services/request-context.service';
import { Public } from '@modules/auth/decorators/public.decorator';
import { ErrorType, ErrorTypeDto } from '@modules/test/dto/error.dto';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'test/error',
})
@Public()
@ApiTags(API_TAGS.TEST)
@ApiBearerAuth()
export class ErrorTestController {
  constructor(
    @Inject(ALS) private readonly als: AlsInstance,
    private readonly requestContextService: RequestContextService,
  ) {}

  @Get('hello')
  @CustomResponse(CommonSuccessCode.COMMON_SUCCESS)
  @ApiOperation({
    summary: 'Health-Check API',
    description: `서버 상태 확인 및 ApiBaseResponse를 확인하기 위한 API 입니다.
    \nHello World!를 return 합니다.`,
  })
  getHello(): string {
    return 'Hello World!';
  }

  @Get('als')
  getRequestContext() {
    return this.requestContextService.getContext();

    // const userId = requestContext.getUserId();
    // const traceId = requestContext.getTraceId();
    //
    // return {
    //   userId: userId ? userId.toString() : '로그인되지 않은 사용자입니다.',
    //   traceId: traceId ? traceId : 'Request ID가 설정되지 않았습니다.',
    // };
  }

  @Get('exception')
  @ApiOperation({
    summary: 'Normal Error 발생 테스트 API',
    description: `Query String에 Error type을 명시하면 됩니다.`,
  })
  raiseError(@Query() query: ErrorTypeDto) {
    const { type } = query;

    if (type == ErrorType.NORMAL) {
      throw new Error('[NORMAL ERROR] 테스트 에러입니다.');
    } else if (type == ErrorType.HTTP) {
      throw new BadRequestException('[HTTP ERROR] 테스트 에러입니다.');
    } else if (type == ErrorType.CUSTOM) {
      throw new CustomException(CommonErrorCode.TEST_CUSTOM_ERROR);
    } else {
      return 'type 쿼리를 normal, custom, http 중 하나로 설정해주세요.';
    }
  }
}
