import { Global, Module } from '@nestjs/common';

import { AsyncLocalStorage } from 'async_hooks';

import { RequestContext } from '@common/context/reqeust.context';

import { ALS } from '@modules/als/constants/als.constants';
import { RequestContextService } from '@modules/als/services/request-context.service';

@Global()
@Module({
  providers: [
    {
      provide: ALS,
      useValue: new AsyncLocalStorage<RequestContext>(),
    },
    RequestContextService,
  ],
  exports: [ALS, RequestContextService],
})
export class AlsModule {}
