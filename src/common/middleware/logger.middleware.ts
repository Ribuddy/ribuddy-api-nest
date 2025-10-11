import { Inject, Injectable, LoggerService, NestMiddleware } from '@nestjs/common';

import * as Sentry from '@sentry/nestjs';
import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ALS, AlsInstance } from '@modules/als/constants/als.constants';
import { RequestContextService } from '@modules/als/services/request-context.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    @Inject(ALS) private readonly als: AlsInstance,
    private readonly requestContextService: RequestContextService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    // 요청 객체로부터 ip, http method, url, user-agent를 받아온다.
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent');
    const startTime = Date.now();

    // 응답이 끝났을 때의 이벤트 리스너를 등록한다.
    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - startTime;

      const requestContext = this.als.getStore();
      const userId = this.requestContextService.getUserId()?.toString() ?? 'Anonymous';
      const traceId = this.requestContextService.getTraceId() ?? 'no-trace-id';
      const formattedTraceId = traceId.slice(0, 4);

      // ✅ 구조화된 로그 객체 생성
      const logPayload = {
        // message는 사람이 읽기 좋은 요약본으로 제공
        message: `[HTTP Request] [${formattedTraceId}] ${method} ${originalUrl} ${statusCode} ${duration}ms`,
        context: LoggerMiddleware.name,
        request: {
          method: method,
          url: originalUrl,
          ip: ip,
          userAgent: userAgent,
          traceId: traceId,
          userId: userId,
        },
        response: {
          statusCode: statusCode,
          duration: duration, // ms 단위
        },
      };
      if (statusCode >= 400) {
        this.logger.warn(logPayload);
      } else {
        this.logger.log(logPayload);
      }
      Sentry.logger.info(logPayload.message, logPayload);
    });

    next();
  }
}
