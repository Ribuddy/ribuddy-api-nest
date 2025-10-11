import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
  LoggerService,
} from '@nestjs/common';

import { SentryExceptionCaptured } from '@sentry/nestjs';
import { Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ExceptionDetails, ExceptionLogPayload } from '@common/codes/code.type';
import { CustomException } from '@common/codes/custom.exception';
import { ApiCommonResponse } from '@common/dto/common-response.dto';
import {
  parseContextToRequestInfo,
  parseCustomExceptionToErrorDetails,
  parseHttpExceptionToErrorDetails,
} from '@common/utils/parse-http-exception.util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

  @SentryExceptionCaptured()
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let errorDetails: ExceptionDetails;
    let logPayload: ExceptionLogPayload;

    // 더 구체적인 CustomException인지 확인
    if (exception instanceof CustomException) {
      errorDetails = parseCustomExceptionToErrorDetails(exception);

      logPayload = {
        // timestamp와 traceId는 Logger에서 추가됨
        context: this.constructor.name,
        filterType: 'CustomExceptionFilter',
        error: errorDetails,
        request: parseContextToRequestInfo(ctx),
      };
    }
    // 그 외에, 우리가 의도하지 않은 일반적인 HttpException이 발생한 것인지 확인
    else {
      errorDetails = parseHttpExceptionToErrorDetails(exception);

      logPayload = {
        // timestamp와 trqceId는 Logger에서 추가됨

        context: this.constructor.name,
        filterType: 'HttpExceptionFilter',
        error: errorDetails,
        request: parseContextToRequestInfo(ctx),
      };
    }

    // Logging은 한 번에!
    // console.log('logPayload', logPayload);
    logPayload.stack = exception.stack;
    this.logger.error(logPayload);

    // 응답이 전송되지 않은 경우에만 Response 전송
    if (!response.headersSent) {
      response
        .status(errorDetails.httpStatusCode)
        .json(ApiCommonResponse.fail(errorDetails.code, errorDetails.message, errorDetails.data));
    }
  }
}
