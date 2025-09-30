import { SetMetadata } from '@nestjs/common';

export const RESPONSE_CODE_METADATA = Symbol('responseCode');

export const ResponseCode = (code: string) => SetMetadata(RESPONSE_CODE_METADATA, code);
