import { HttpStatus } from '@nestjs/common';

import { CustomErrorCode } from '@common/codes/code.type';

export class AuthErrorCode {
  public static readonly NOT_VALID_USER: CustomErrorCode = {
    code: 'AUTH0001',
    status: HttpStatus.UNAUTHORIZED,
    message: '유효하지 않은 사용자입니다.',
  };

  public static readonly INVALID_GOOGLE_ID_TOKEN: CustomErrorCode = {
    code: 'AUTH0002',
    status: HttpStatus.UNAUTHORIZED,
    message: '올바르지 않은 Google ID Token 입니다.',
  };
}
