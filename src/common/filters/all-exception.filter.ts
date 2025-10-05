import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
  LoggerService,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { CommonErrorCode } from '@common/codes/error/common.error.code';
import { ApiCommonResponse } from '@common/dto/common-response.dto';

@Catch() // 👈 모든 예외를 캐치
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    this.logger.error(
      `[ALL_EXCEPTION -  ${exception && (exception as any).constructor?.name}] ${request.method} ${request.url}`,
      exception, // exception 객체 자체를 넘겨 스택 트레이스 등을 확인
    );

    console.error(exception);

    const { code: errorCode, status, message } = CommonErrorCode.UNKNOWN_ERROR;

    if (!response.headersSent) {
      response.status(status).json(ApiCommonResponse.fail(errorCode, message, null));
    }
  }
}
