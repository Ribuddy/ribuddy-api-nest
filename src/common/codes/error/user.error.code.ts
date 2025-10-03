import { HttpStatus } from '@nestjs/common';

import { CustomErrorCode } from '@common/codes/code.type';

export class UserErrorCode {
  public static readonly NO_USER: CustomErrorCode = {
    code: 'USER0001',
    status: HttpStatus.NOT_FOUND,
    message: '존재하지 않는 사용자입니다.',
  };
}
