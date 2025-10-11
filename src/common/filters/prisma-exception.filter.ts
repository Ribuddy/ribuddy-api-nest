import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
  LoggerService,
} from '@nestjs/common';

import { PrismaClientKnownRequestError as MongoDBPrismaError } from '@generated/prisma/mongodb/runtime/library';
import { PrismaClientKnownRequestError as MySQLPrismaError } from '@generated/prisma/mysql/runtime/library';
import { SentryExceptionCaptured } from '@sentry/nestjs';
import { Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ApiCommonResponse } from '@common/dto/common-response.dto';

@Catch(MySQLPrismaError, MongoDBPrismaError)
export class PrismaExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

  @SentryExceptionCaptured()
  catch(exception: MySQLPrismaError | MongoDBPrismaError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    this.logger.error(
      `[PRISMA EXCEPTION] [${request.method} ${request.url}] [CODE ${exception.code}] ${exception.message}`,
      exception.stack,
    );

    // if (process.env.NODE_ENV === 'development') console.error(exception);

    if (!response.headersSent) {
      response
        .status(HttpStatus.SERVICE_UNAVAILABLE)
        // TODO: prod에서는 그대로 반환 X
        .json(ApiCommonResponse.fail(exception.code, 'PRISMA FAIL', exception));
    }
  }
}
