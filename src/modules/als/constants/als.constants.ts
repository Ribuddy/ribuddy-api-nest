// DI를 위한 토큰(심볼) 정의
import { AsyncLocalStorage } from 'async_hooks';

import { RequestContext } from '@common/context/reqeust.context';

export const ALS = Symbol('AsyncLocalStorage');
// AsyncLocalStorage의 타입 정의 (선택적이지만 권장)
export type AlsInstance = AsyncLocalStorage<RequestContext>;
