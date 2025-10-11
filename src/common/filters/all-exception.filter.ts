import { ArgumentsHost, Catch, ExceptionFilter, Inject, LoggerService } from '@nestjs/common';

import { SentryExceptionCaptured } from '@sentry/nestjs';
import { Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { CommonErrorCode } from '@common/codes/error/common.error.code';
import { ApiCommonResponse } from '@common/dto/common-response.dto';

@Catch() // 👈 모든 예외를 캐치
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

  @SentryExceptionCaptured()
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    this.logger.error(
      `[ALL_EXCEPTION -  ${exception && (exception as any).constructor?.name}] ${request.method} ${request.url}`,
      exception instanceof Error ? exception.stack : 'NOT_INSTANCE_OF_ERROR',
    );

    // if (process.env.NODE_ENV === 'development') console.error(exception);

    const { code: errorCode, status, message } = CommonErrorCode.UNKNOWN_ERROR;

    if (!response.headersSent) {
      response.status(status).json(ApiCommonResponse.fail(errorCode, message, null));
    }
  }
}
