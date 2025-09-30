import { ArgumentsHost, Catch, ExceptionFilter, Inject, LoggerService } from '@nestjs/common';

import { Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { CustomException } from '@common/codes/custom.exception';
import { ApiCommonResponse } from '@common/dto/common-response.dto';
import {
  parseContextToRequestInfo,
  parseCustomExceptionToErrorDetails,
} from '@common/utils/parse-http-exception.util';

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const errorDetails = parseCustomExceptionToErrorDetails(exception);

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

    // 응답이 전송되지 않은 경우에만 Response 전송
    if (!response.headersSent) {
      response
        .status(errorDetails.httpStatusCode)
        .json(
          ApiCommonResponse.fail(errorDetails.code, '요청이 실패하였습니다.', errorDetails.message),
        );
    }
  }
}
