import { HttpStatus } from '@nestjs/common';

import { ICustomCode } from '@common/codes/code.type';

export class CommonCode {
  public static readonly UNKNOWN_ERROR: ICustomCode = {
    code: 'COMMON0001',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message:
      'HttpException이 아닌, 알 수 없는 에러가 발생했습니다. X-Trace-ID 값을 첨부하여 관리자에게 문의하세요.',
  };

  public static readonly TEST_CUSTOM_ERROR: ICustomCode = {
    code: 'COMMON0002',
    status: HttpStatus.NOT_IMPLEMENTED,
    message: '테스트 용으로 사용되는 커스텀 에러입니다.',
  };

  public static readonly UNKNOWN_HTTP_EXCEPTION: ICustomCode = {
    code: 'COMMON0003',
    status: HttpStatus.NOT_IMPLEMENTED,
    message: '정의되지 않은 HttpException 입니다. 관리자에게 문의하세요.',
  };
}
