import { Inject, Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { RequestContext } from '@common/context/reqeust.context';

import { ALS, AlsInstance } from '@modules/request-context/request-context.module';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(@Inject(ALS) private readonly als: AlsInstance) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Header에 설정된 Request Id가 있으면 그걸 따르고, 없다면 생성
    const traceId = (req.headers['x-trace-id'] as string) ?? uuidv4();

    res.setHeader('X-Trace-Id', traceId);

    // 생성자를 통해 인스턴스 생성
    const requestContext = new RequestContext(traceId);
    this.als.run(requestContext, next);
  }
}
