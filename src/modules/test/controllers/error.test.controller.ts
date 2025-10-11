import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  UseGuards,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CustomException } from '@common/codes/custom.exception';
import { CommonErrorCode } from '@common/codes/error/common.error.code';
import { CommonSuccessCode } from '@common/codes/success/common.success.code';
import { CustomResponse } from '@common/decorators/response/custom-response.decorator';

import { ALS, AlsInstance } from '@modules/als/constants/als.constants';
import { RequestContextService } from '@modules/als/services/request-context.service';
import { Public } from '@modules/auth/decorators/public.decorator';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'test/error',
})
@Public()
@ApiTags('Test API')
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

  @Get('exception/normal')
  @ApiOperation({
    summary: 'Normal Error 발생 테스트 API',
    description: `\`CustomException\`이나 \`HttpException\`에 모두 해당하지 않는, General한 Error를 throw 합니다.
    \n비즈니스 로직에서 의도되지 않은 Exception이며, 외부 패키지 단에서 예상하지 못한 오류가 발생하는 경우가 해당합니다.
    \n응답을 참고해주세요.`,
  })
  raiseError() {
    throw new Error('[NORMAL ERROR] 테스트 에러입니다.');
  }

  @Get('exception/http')
  @ApiOperation({
    summary: 'HttpException 발생 테스트 API',
    description: `HttpException를 throw 하는 API 입니다. 응답을 참고해주세요.`,
  })
  raiseHttpError(): string {
    throw new BadRequestException('[HTTP ERROR] 테스트 에러입니다.');
  }

  @Get('exception/custom')
  @ApiOperation({
    summary: 'CustomException 발생 테스트 API',
    description: `CustomException을 throw 하는 API 입니다. 응답을 참고해주세요.`,
  })
  raiseCustomError() {
    throw new CustomException(CommonErrorCode.TEST_CUSTOM_ERROR);
  }
}
