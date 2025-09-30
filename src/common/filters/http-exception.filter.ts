import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ApiCommonResponse } from '@common/dto/common-response.dto';
import { inspectObject } from '@common/utils/inspect-object.util';
import {
  parseContextToRequestInfo,
  parseHttpExceptionToErrorDetails,
} from '@common/utils/parse-http-exception.util';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let errorCode: string;
    let status: HttpStatus;
    let message: string | object;

    // Filter로 넘어온게 HttpException인 경우
    if (exception instanceof HttpException) {
      const errorDetails = parseHttpExceptionToErrorDetails(exception);

      status = errorDetails.httpStatusCode;
      errorCode = errorDetails.code;
      message = errorDetails.message;

      const logPayload = {
        // timestamp와 trqceId는 Logger에서 추가됨

        context: this.constructor.name,
        error: errorDetails,
        request: parseContextToRequestInfo(ctx),
      };

      //   this.logger.log(
      //     LOG_LEVELS.VERBOSE,
      //     `[${request.method} ${request.url} ${status}]\nStack Trace: ${exception.stack}`,
      // );
      // this.logger.log(LOG_LEVELS.VERBOSE, logPayload);
      this.logger.log(logPayload);
    } else {
      // 2. 그 외 모든 알 수 없는 에러인 경우
      errorCode = 'COMMON0001'; // 공통_0001: 알 수 없는 서버 오류
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = '알 수 없는 오류가 발생했습니다. TRACE_ID와 함께 관리자에게 문의하세요.';

      this.logger.error(
        `[${request.method} ${request.url}] - Unhandled Exception - ${inspectObject(exception)}`,
      );
    }

    // 응답이 전송되지 않은 경우에만 Response 전송
    if (!response.headersSent) {
      response
        .status(status)
        .json(ApiCommonResponse.fail(errorCode, '요청이 실패하였습니다.', message));
    }
  }
}
