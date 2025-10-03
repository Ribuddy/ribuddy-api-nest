import { HttpStatus } from '@nestjs/common';

import { CustomSuccessCode } from '@common/codes/code.type';

export class CommonSuccessCode {
  public static readonly COMMON_SUCCESS: CustomSuccessCode = {
    code: 'COMMON200',
    status: HttpStatus.OK,
    message: '요청이 정상적으로 처리되었습니다.',
  };
}
