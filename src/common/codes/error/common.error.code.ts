import { HttpStatus } from '@nestjs/common';

import { CustomErrorCode } from '@common/codes/code.type';

export class CommonErrorCode {
  public static readonly UNKNOWN_ERROR: CustomErrorCode = {
    code: 'ERR0001',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: '알 수 없는 에러가 발생했습니다. X-Trace-ID 값을 첨부하여 관리자에게 문의하세요.',
  };

  public static readonly TEST_CUSTOM_ERROR: CustomErrorCode = {
    code: 'ERR0002',
    status: HttpStatus.NOT_IMPLEMENTED,
    message: 'Filter 테스트 시 발생하는 커스텀 에러입니다.',
  };

  public static readonly UNKNOWN_HTTP_EXCEPTION: CustomErrorCode = {
    code: 'ERR0003',
    status: HttpStatus.NOT_IMPLEMENTED,
    message: 'Unknown HttpException. 관리자에게 문의하세요.',
  };

  public static readonly REQUEST_CONTEXT_ERROR: CustomErrorCode = {
    code: 'ERR0004',
    status: HttpStatus.UNAUTHORIZED,
    message: 'RequestContext 관련 오류입니다. 관리자에게 문의하세요.',
  };
}
