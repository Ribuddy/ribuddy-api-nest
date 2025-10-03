import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BYPASS_RESPONSE_INTERCEPTOR } from '@common/decorators/bypass-response-interceptor.decorator';
import { RESPONSE_CODE_METADATA } from '@common/decorators/response/response-code.decorator';
import { RESPONSE_MESSAGE_METADATA } from '@common/decorators/response/response-message.decorator';
import { ApiCommonResponse } from '@common/dto/common-response.dto';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiCommonResponse<T>> {
  constructor(
    private readonly reflector: Reflector,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiCommonResponse<T>> {
    const bypass = this.reflector.get<boolean>(BYPASS_RESPONSE_INTERCEPTOR, context.getHandler());

    // bypass 데코레이터가 있으면, interceptor를 적용하지 않습니다.
    if (bypass) {
      return next.handle();
    }

    // interceptor logic
    return next.handle().pipe(
      map((res: any) => this.responseHandler(res, context)),
      catchError((err: unknown) => {
        if (err instanceof HttpException) {
          this.logger.log('error', err);
        }
        // 기존 HttpException도 여기서 응답을 처리하였으나,
        // 설계 패턴 상 ExceptionFilter에서 응답을 생성하는 것으로 변경합니다.
        return throwError(() => err);
      }),
    );
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode =
      this.reflector.get<string>(RESPONSE_CODE_METADATA, context.getHandler()) || 'COMMON0001';
    const message =
      this.reflector.get<string>(RESPONSE_MESSAGE_METADATA, context.getHandler()) ||
      '요청이 성공했습니다.';

    return ApiCommonResponse.success<T>(statusCode, message, res);
  }
}
