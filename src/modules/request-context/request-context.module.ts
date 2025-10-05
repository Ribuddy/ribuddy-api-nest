import { Global, Module, Scope } from '@nestjs/common';

import { AsyncLocalStorage } from 'async_hooks';

import { ALS, RequestContext } from '@common/context/reqeust.context';
import { REQUEST_CONTEXT } from '@common/middleware/request-context.middleware';

@Global()
@Module({
  providers: [
    {
      provide: REQUEST_CONTEXT,
      scope: Scope.REQUEST,
      useFactory: () => RequestContext.current,
    },
    {
      provide: ALS,
      useValue: new AsyncLocalStorage<RequestContext>(),
    },
  ],
  exports: [REQUEST_CONTEXT, ALS],
})
export class RequestContextModule {}
